// src/server/server.service.ts
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Server } from './server.schema';
import { UserService } from '../user/user.service';

@Injectable()
export class ServerService {
  constructor(
    @InjectModel(Server.name) private serverModel: Model<Server>,
    @Inject(forwardRef(() => UserService)) private userService: UserService,

  ) {}

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

  async joinUser(serverId: string, userId: string): Promise<Server> {
    const server = await this.serverModel.findById(serverId).exec();
    if (!server) {
      throw new Error('Server not found');
    }
    if ( server.users.find(u => u.user.toString() === userId) ) {
      throw new Error('User already in server');
    }
    const user = await this.userService.findOne(userId);
    server.users.push({
      user: user,
      status: 'active',
    });
    await server.save();
    return server;
  }

  async remove(id: string): Promise<Server> {
    return this.serverModel.findByIdAndDelete(id);
  }
}
