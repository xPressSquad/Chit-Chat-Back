import { Inject, UseFilters, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { CreateMessageDTO } from "./dto/message.dto";
import { MessageRepositoryInterface } from "./interfaces/message.repository.interface";
import { WebSocketExceptionFilter } from "./filters/websocket.exception.filter";
import { AuthGuard } from "src/common/guards/auth.guard";
import { AuthService } from "src/auth/auth.service";
import { Types } from "mongoose";

@WebSocketGateway(8000, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true,
    },
    transports: ['websocket'],
    pingTimeout: 60000, // 60 seconds
    pingInterval: 25000 
})
@UseFilters(new WebSocketExceptionFilter())
export class MessageGeteway implements OnGatewayConnection, OnGatewayDisconnect {
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
            client.data.user = user; 
        } catch (error) {
            throw new WsException('Invalid token'); 
        }
    }

    handleDisconnect(client: any) {
        console.log('Client disconnected:', client.id);
    }

    @SubscribeMessage('sendMessage')
    @UsePipes(new ValidationPipe({ 
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        enableDebugMessages: true, 
    }))
    async handleMessage(
        @MessageBody() createMessageDTO: CreateMessageDTO,
        @ConnectedSocket() client: Socket,
    ) {
        try {
            if (!client.data?.user?._id) {
                throw new WsException('User not authenticated');
            }

            const validatedDto = {
                ...createMessageDTO,
                server_id: new Types.ObjectId(createMessageDTO.server_id)
            };

            const userId = new Types.ObjectId(client.data.user._id);
            const newMessage = await this.messageRepository.createMessage(validatedDto, userId);

            // Emit the new message to all clients in the server
            this.server.emit('newMessage', newMessage);

            return { status: 'success', message: newMessage };
        } catch (err: any) {
            console.error('Message handling error:', err);
            throw new WsException(err.message || 'Failed to process message');
        }
    }

    @SubscribeMessage('getMessages')
    async handelGetMessages(
        @MessageBody() data: { server_id: string },
        @ConnectedSocket() client: Socket
    ) {
        try {
            console.log('Fetching messages for server:', data.server_id);
            const serverId = new Types.ObjectId(data.server_id);
            const fetchedMessages = await this.messageRepository.getAllMessages(serverId);
            client.emit('messages', fetchedMessages);
            
            return { status: 'success', messages: fetchedMessages };
        } catch (err: any) {
            console.error('Get messages error:', err);
            throw new WsException(err.message || 'Failed to fetch messages');
        }
    }
}
