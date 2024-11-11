// src/server/schemas/server.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../user/user.schema';

export type ServerDocument = HydratedDocument<Server>;

@Schema()
export class Server {
  @Prop({ required: true })
  name: string;

  @Prop()
  cover: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  admin: User;

  @Prop([
    {
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      status: { type: String, enum: ['online', 'offline'], default: 'offline' },
    },
  ])
  users: Array<{ user_id: User; status: string }>;

  @Prop()
  visibility: boolean;

  @Prop({ enum: ['duo', 'group'], default: 'group' })
  type: string;
}

export const ServerSchema = SchemaFactory.createForClass(Server);
