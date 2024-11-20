// src/message/message.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './message.schema';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessageRepository } from './message.repository';
import { MessageGeteway } from './messaging.geteway';
import { WebSocketExceptionFilter } from './filters/websocket.exception.filter';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]), AuthModule],
  providers: [
    MessageService,
    MessageGeteway,
    WebSocketExceptionFilter,
    {
      provide: 'MessageRepositoryInterface',
      useClass: MessageRepository
    }
  ],
  controllers: [MessageController],
  exports: [MessageService],
})
export class MessageModule {}
