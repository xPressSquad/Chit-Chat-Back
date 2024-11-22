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
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      status: { type: String, enum: ['active', 'pending'], default: 'pending' },
    },
  ])
  users: Array<{ user: User; status: string }>;

  @Prop({ enum: ['public', 'private'], default: 'public' })
  visibility: 'public' | 'private';

  @Prop({ enum: ['duo', 'group'], default: 'group' })
  type: string;
}



export const ServerSchema = SchemaFactory.createForClass(Server);
