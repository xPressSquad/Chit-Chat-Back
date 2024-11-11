// src/message/schemas/message.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  server_id: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true, enum: ['true', 'false'], default: 'false' })
  deleted: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
