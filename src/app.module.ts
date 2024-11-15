  import { Module } from '@nestjs/common';
  import { AppController } from './app.controller';
  import { AppService } from './app.service';
  import { ConfigModule } from '@nestjs/config';
  import { MongooseModule } from '@nestjs/mongoose';
  import { ServerModule } from './server/server.module';
  import { ServeStaticModule } from '@nestjs/serve-static';
  import { join } from 'path';

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

    ],
    controllers: [AppController],
    providers: [AppService],
  })
  export class AppModule {}


