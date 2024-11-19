import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../user/user.schema';

export type FriendDocument = HydratedDocument<Friend>;

@Schema()
export class Friend {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user1: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user2: User;

  @Prop({ enum: ['approved', 'pending', 'deleted'], default: 'pending' })
  status: string;

  @Prop({ type: Date, default: Date.now })
  invitationSentAt: Date;
}

export const FriendSchema = SchemaFactory.createForClass(Friend);
