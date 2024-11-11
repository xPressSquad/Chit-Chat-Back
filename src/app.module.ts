// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ServerModule } from './server/server.module';
import { MessageModule } from './message/message.module';
import { NotificationModule } from './notification/notification.module';
import { FriendModule } from './friend/friend.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    UserModule,
    AuthModule,
    ServerModule,
    MessageModule,
    NotificationModule,
    FriendModule,
  ]})
export class AppModule {}