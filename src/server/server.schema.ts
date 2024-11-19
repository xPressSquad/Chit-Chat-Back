import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ServerVisibility, ServerType } from './dto/create-server.dto';
import { fa } from '@faker-js/faker/.';

export type ServerDocument = HydratedDocument<Server>;

@Schema({ timestamps: true })
export class Server {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  cover?: string;

  @Prop({ required: true })
  admin: string;

  @Prop([String])
  members: string[] = [];

  @Prop({ 
    type: String, 
    enum: ServerVisibility, 
    default: ServerVisibility.PUBLIC 
  })
  visibility: ServerVisibility;

  @Prop({ 
    type: String, 
    enum: ServerType, 
    required: true 
  })
  type: ServerType;
}

export const ServerSchema = SchemaFactory.createForClass(Server);