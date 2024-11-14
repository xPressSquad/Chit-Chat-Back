// src/message/message.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './message.schema';

@Injectable()
export class MessageService {
  constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) {}

  async findAll(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }

  async findOne(id: string): Promise<Message> {
    return this.messageModel.findById(id).exec();
  }

  async create(messageData: Partial<Message>): Promise<Message> {
    const message = new this.messageModel(messageData);
    return message.save();
  }

  async remove(id: string): Promise<Message> {
    return this.messageModel.findByIdAndDelete(id);
  }
}
