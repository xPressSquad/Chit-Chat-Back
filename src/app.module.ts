<<<<<<< HEAD
// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ServerModule } from './server/server.module';
import { MessageModule } from './message/message.module';
=======
  import { Module } from '@nestjs/common';
  import { AppController } from './app.controller';
  import { AppService } from './app.service';
  import { ConfigModule } from '@nestjs/config';
  import { MongooseModule } from '@nestjs/mongoose';
  import { ServerModule } from './server/server.module';
  import { ServeStaticModule } from '@nestjs/serve-static';
  import { join } from 'path';
>>>>>>> 7a50422526f0f25687027d391ac2583e77a3d7e4
import { NotificationModule } from './notification/notification.module';

<<<<<<< HEAD
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    UserModule,
    ServerModule,
    MessageModule,
    NotificationModule,
    FriendModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
=======
  @Module({
    imports: [
      ConfigModule.forRoot({
        envFilePath: '.env',
        isGlobal: true,
      }),
      ServerModule, 
      MongooseModule.forRoot(process.env.DB_URI),
      ServeStaticModule.forRoot({
        rootPath: join(__dirname, '..', 'uploads'),
        serveRoot: '/uploads',
      }),
      NotificationModule,

    ],
    controllers: [AppController],
    providers: [AppService],
  })
  export class AppModule {}


>>>>>>> 7a50422526f0f25687027d391ac2583e77a3d7e4
