// src/message/message.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Message extends Document {
  @Prop()
  sender: string;

  @Prop()
  content: string;

  @Prop()
  timestamp: Date;

  @Prop()
  serverId: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);