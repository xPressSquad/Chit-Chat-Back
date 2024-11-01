// src/user/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

enum UserStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
}

@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  avarar: string;

  @Prop({ enum: UserStatus, default: UserStatus.OFFLINE })
  status: UserStatus

}

export const UserSchema = SchemaFactory.createForClass(User);