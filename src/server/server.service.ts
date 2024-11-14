// src/server/server.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Server, ServerDocument } from './server.schema';

@Injectable()
export class ServerService {
  constructor(@InjectModel(Server.name) private serverModel: Model<ServerDocument>) {}

  async findAll(): Promise<Server[]> {
    return this.serverModel.find().exec();
  }

  async findOne(id: string): Promise<Server> {
    return this.serverModel.findById(id).exec();
  }

  async create(serverData: Partial<Server>): Promise<Server> {
    const server = new this.serverModel(serverData);
    return server.save();
  }

  async remove(id: string): Promise<Server> {
    return this.serverModel.findByIdAndDelete(id);
  }
}
