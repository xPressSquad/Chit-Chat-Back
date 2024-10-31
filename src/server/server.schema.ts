// src/server/server.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Server extends Document {
  @Prop()
  name: string;

  @Prop()
  cover: string;

  @Prop()
  admin: string;

  @Prop([String])
  members: string[];

  @Prop()
  visibility: string; // e.g., 'public', 'private'

  @Prop()
  type: string; // e.g., duo, group
}

export const ServerSchema = SchemaFactory.createForClass(Server);