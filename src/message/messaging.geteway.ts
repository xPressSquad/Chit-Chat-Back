import { Inject, Request, UseFilters, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException, OnGatewayConnection } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { CreateMessageDTO } from "./dto/message.dto";
import { MessageRepositoryInterface } from "./interfaces/message.repository.interface";
import { WebSocketExceptionFilter } from "./filters/websocket.exception.filter";
import { AuthGuard } from "src/common/guards/auth.guard";
import { AuthService } from "src/auth/auth.service";
import { Types } from "mongoose";

@WebSocketGateway({
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true,
    },
})
@UseFilters(new WebSocketExceptionFilter())
export class MessageGeteway implements OnGatewayConnection {
    @WebSocketServer()
    server: Server;

    constructor(
        @Inject('MessageRepositoryInterface') private readonly messageRepository: MessageRepositoryInterface,
        private readonly jwtService: AuthService// Inject JWT service for token verification
    ) { }

    // Handle connection and extract the authorization token from headers
    async handleConnection(client: Socket) {
        const token = Array.isArray(client.handshake.query.token)
            ? client.handshake.query.token[0]
            : client.handshake.query.token;

        if (!token) {
            throw new WsException('No token provided');
        }

        try {
            const user = this.jwtService.validateToken(token);  // Assuming token is in 'Bearer <token>'
            client.data.user = user;  // Store user in socket connection data for later use
        } catch (error) {
            throw new WsException('Invalid token');
        }
    }

    @SubscribeMessage('sendMessage')
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async handleMessage(
        @MessageBody() createMessageDTO: CreateMessageDTO,
        @ConnectedSocket() client: Socket,
    ) {
        try {
            const validatedDto = {
                ...createMessageDTO,
                server_id: new Types.ObjectId(createMessageDTO.server_id)
            };
            // Access the user information from client.data (set in handleConnection)
            const userId = new Types.ObjectId(client.data.user._id);
            await this.messageRepository.createMessage(validatedDto, userId);
            this.server.emit('messages', createMessageDTO);
        } catch (err: any) {
            throw new WsException('Failed to process message');
        }
    }

    @SubscribeMessage('getMessages')
    @UseGuards(AuthGuard)
    async handelGetMessages(
        @ConnectedSocket() client: Socket
    ) {
        try {
            const fetchedMessages = await this.messageRepository.getAllMessages();
            this.server.emit('messages', fetchedMessages);
        } catch (err: any) {
            throw new WsException('Failed to process message');
        }
    }
}
