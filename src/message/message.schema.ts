// src/message/schemas/message.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;


@Schema({ timestamps: true })
export class Message {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Server' , required: true })
  server_id: Types.ObjectId;

  @Prop({ required: true })
  message: string

  @Prop({ enum: ['true', 'false'], default: 'false' })
  deleted: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
