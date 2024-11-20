import { ArgumentsHost, Catch, WsExceptionFilter } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import { Socket } from 'socket.io';

@Catch(WsException)

export class WebSocketExceptionFilter implements WsExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const client = host.switchToWs().getClient<Socket>();
        const errorMessage = exception.getError();

        client.emit('exception', {
            status: 'error',
            message: errorMessage
        })
    }
}