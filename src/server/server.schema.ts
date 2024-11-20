// src/server/server.schema.ts
import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ServerVisibility, ServerType } from './dto/create-server.dto';
import { fa } from '@faker-js/faker/.';

enum Visibility {
  PUBLIC = 'public',
  PRIVATE = 'private'
}

@Schema()
class Members {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId

  @Prop({ default: false })
  static: boolean
}
const MembersSchema = SchemaFactory.createForClass(Members);

@Schema({ timestamps: true })

export class Server {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  cover?: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  admin: Types.ObjectId;

  @Prop({ type: [MembersSchema], default: [] })
  members: Members[];

  @Prop({ enum: Visibility, default: Visibility.PUBLIC })
  visibility: Visibility; // e.g., 'public', 'private'

  @Prop({ enum: ServerType, default: ServerType.DUO })
  type: ServerType; // e.g., duo, group
}


export type serverDocument = Server & Document;
export const ServerSchema = SchemaFactory.createForClass(Server);