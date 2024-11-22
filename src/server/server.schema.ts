import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/user.schema';
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

  @Prop([
    {
      members: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      status: { type: String, enum: ['active', 'pending'], default: 'pending' },
    },
  ])
  members: Array<{ member: User; status: string }>;

  @Prop({ enum: ['public', 'private'], default: 'public' })
  visibility: 'public' | 'private';

  @Prop({ 
    type: String, 
    enum: ServerType, 
    required: true 
  })
  type: ServerType;
}



export const ServerSchema = SchemaFactory.createForClass(Server);
