import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationsGateway } from './notification.gateway';

@Module({
  providers: [NotificationsGateway, NotificationService],
})
export class NotificationModule {}
