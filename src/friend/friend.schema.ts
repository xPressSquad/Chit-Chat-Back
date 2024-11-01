// src/friend/friend.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Friend extends Document {
  @Prop()
  userId: string;

  @Prop()
  friendId: string;

  @Prop()
  status: string; // e.g., 'pending', 'accepted', 'blocked'
}

export const FriendSchema = SchemaFactory.createForClass(Friend);