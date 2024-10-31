import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ServerModule } from './server/server.module';
import { MessageModule } from './message/message.module';
import { FriendModule } from './friend/friend.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    UserModule,
    ServerModule,
    MessageModule,
    FriendModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}