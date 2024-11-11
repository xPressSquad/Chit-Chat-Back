// src/user/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

enum UserStatus {
  OFFLINE= 'offline',
  ONLINE= 'online'
}

@Schema()
export class User extends Document {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  avatar: string; // Fixed typo from "avarar" to "avatar"

  @Prop({ enum: UserStatus, default: UserStatus.OFFLINE })
  status: UserStatus;
}

export type userDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
