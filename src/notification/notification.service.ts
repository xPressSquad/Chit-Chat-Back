import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationService {
  private clients: { [id: string]: Socket } = {};
  private channels: { [channelId: string]: Set<Socket> } = {};

  authorizeClient(client: Socket) {
    const clientId = client.id;
    this.clients[clientId] = client;
  }

  handleClientDisconnect(client: Socket) {
    const clientId = client.id;
    
    delete this.clients[clientId];

    Object.keys(this.channels).forEach((channelId) => {
      this.channels[channelId].delete(client);
    });
  }

  joinChannel(client: Socket, channelId: string) {
    if (!this.channels[channelId]) {
      this.channels[channelId] = new Set();
    }
    this.channels[channelId].add(client);
    
  }

  leaveChannel(client: Socket, channelId: string) {
    if (this.channels[channelId]) {
      this.channels[channelId].delete(client);
    }
  }

  sendNotification(notification: CreateNotificationDto) {
    const { channelId, payload } = notification;
    if (this.channels[channelId]) {
      this.channels[channelId].forEach((client) => {
        client.emit('notification', payload);
      });
    }
  }

  // get all notifications
  findAllNotifications() {
    // Return all notifications
    return Object.values(this.channels).flatMap(channel => 
      Array.from(channel).map(client => client.id)
    );
  }


  updateNotification(id: string, updateNotificationDto: UpdateNotificationDto) {
    // Update the notification and emit an update event
  }

  deleteNotification(id: string) {
    // Delete the notification and emit a delete event
  }
}


// import { Injectable } from '@nestjs/common';
// import { CreateNotificationDto } from './dto/create-notification.dto';
// import { UpdateNotificationDto } from './dto/update-notification.dto';

// @Injectable()
// export class NotificationService {
//   create(createNotificationDto: CreateNotificationDto) {
//     return 'This action adds a new notification';
//   }

//   findAll() {
//     return `This action returns all notification`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} notification`;
//   }

//   update(id: number, updateNotificationDto: UpdateNotificationDto) {
//     return `This action updates a #${id} notification`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} notification`;
//   }
// }