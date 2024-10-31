// src/server/server.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Server } from './server.schema';

@Injectable()
export class ServerService {
  constructor(@InjectModel(Server.name) private serverModel: Model<Server>) {}

  async findAll(): Promise<Server[]> {
    return this.serverModel.find().exec();
  }

  async findOne(id: string): Promise<Server> {
    return this.serverModel.findById(id).exec();
  }

  async remove(id: string): Promise<void> {
    await this.serverModel.findByIdAndDelete(id).exec();
  }
}