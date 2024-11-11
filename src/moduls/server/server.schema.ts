// src/server/server.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

enum Visibility {
  PUBLIC = 'public',
  PRIVATE = 'private'
}

enum ServerType {
  GROUP = 'group',
  DUO = 'duo'
}

@Schema()
class Members {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId

  @Prop({ default: false })
  static: boolean
}
const MembersSchema = SchemaFactory.createForClass(Members);

@Schema()
export class Server extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  cover: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  admin: Types.ObjectId;

  @Prop({ type: [MembersSchema], default: [] })
  members: Members[];

  @Prop({ enum: Visibility, default: Visibility.PUBLIC })
  visibility: Visibility; // e.g., 'public', 'private'

  @Prop({ enum: ServerType, default: ServerType.DUO })
  type: ServerType; // e.g., duo, group
}

export const ServerSchema = SchemaFactory.createForClass(Server);