// src/notifications/notifications.gateway.ts
import { Server } from 'socket.io';
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket } from '@nestjs/websockets';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@WebSocketGateway(3001)
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private notificationsService: NotificationService) {}

  // Establish WebSocket Connection
  handleConnection(client: any) { // Use 'any' type instead of 'Socket'
    // Authenticate and authorize the client
    this.notificationsService.authorizeClient(client);
  }

  // Handle Client Disconnection
  handleDisconnect(client: any) { // Use 'any' type instead of 'Socket'
    // Clean up resources associated with the client
    this.notificationsService.handleClientDisconnect(client);
  }


  // get all notifications
  @SubscribeMessage('findAllNotifications')
  handleFindAllNotifications() {
    return this.notificationsService.findAllNotifications();

  }
  // Subscribe to Notifications
  @SubscribeMessage('join_channel')
  handleJoinChannel(@ConnectedSocket() client: any, @MessageBody() channelId: string) { // Use 'any' type instead of 'Socket'
    // Allow the client to join a notification channel
    this.notificationsService.joinChannel(client, channelId);
  }

  // Emit Notifications
  @SubscribeMessage('send_notification')
  handleSendNotification(@ConnectedSocket() client: any, @MessageBody() notification: any) { // Use 'any' type instead of 'Socket'
    // Publish a notification to the appropriate channel(s)
    this.notificationsService.sendNotification(notification);
  }
}

// import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';

// @WebSocketGateway(3001) // Explicitly set port to 3001
// export class NotificationGateway {
//   @SubscribeMessage('createNotification')
//   handleCreateNotification(@MessageBody() data: any) {
//     console.log('Received notification:', data);
//     return { event: 'notification', data: 'Notification created successfully' };
//   }
// }

// import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
// import { NotificationService } from './notification.service';
// import { CreateNotificationDto } from './dto/create-notification.dto';
// import { UpdateNotificationDto } from './dto/update-notification.dto';

// @WebSocketGateway(3001)
// export class NotificationGateway {
//   constructor(private readonly notificationService: NotificationService) {}

//   @SubscribeMessage('createNotification')
//   create(@MessageBody() createNotificationDto: CreateNotificationDto) {
//     console.log('Received notification:', createNotificationDto);
//     return this.notificationService.create(createNotificationDto);
//   }

//   @SubscribeMessage('findAllNotification')
//   findAll() {
//     return this.notificationService.findAll();
//   }

//   @SubscribeMessage('findOneNotification')
//   findOne(@MessageBody() id: number) {
//     return this.notificationService.findOne(id);
//   }

//   @SubscribeMessage('updateNotification')
//   update(@MessageBody() updateNotificationDto: UpdateNotificationDto) {
//     return this.notificationService.update(updateNotificationDto.id, updateNotificationDto);
//   }

//   @SubscribeMessage('removeNotification')
//   remove(@MessageBody() id: number) {
//     return this.notificationService.remove(id);
//   }
// }
