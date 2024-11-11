// src/notification/notification.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Notification extends Document {
  @Prop()
  userId: string;

  @Prop()
  message: string;

  @Prop()
  read: boolean;

  @Prop()
  timestamp: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);