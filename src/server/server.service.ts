
// src/server/server.service.ts

import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject, 
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Server, ServerDocument } from './server.schema';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { UserService } from '../user/user.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ServerService {
  private readonly uploadsPath = path.join(process.cwd(), 'uploads', 'servers');

  constructor(
    @InjectModel(Server.name) private serverModel: Model<Server>,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) {
    if (!fs.existsSync(this.uploadsPath)) {
      fs.mkdirSync(this.uploadsPath, { recursive: true });
    }
  }

  async createServer(createServerDto: CreateServerDto, file?: Express.Multer.File): Promise<Server> {
    const existingServer = await this.serverModel
      .findOne({ name: createServerDto.name })
      .exec();

    if (existingServer) {
      if (file) {
        this.deleteFile(file.filename);
      }
      throw new BadRequestException(`Server with name "${createServerDto.name}" already exists`);
    }

    const serverData = {
      ...createServerDto,
      cover: file ? `/uploads/servers/${file.filename}` : undefined,
    };

    const newServer = new this.serverModel(serverData);
    return newServer.save();
  }

  async getAllServers(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [servers, total] = await Promise.all([
      this.serverModel
        .find()
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec(),
      this.serverModel.countDocuments(),
    ]);

    return {
      data: servers.map(server => ({
        ...server.toJSON(),
        cover: server.cover ? `${process.env.API_URL || 'http://localhost:3000'}${server.cover}` : null
      })),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async joinUser(serverId: string, userId: string): Promise<Server> {
    const server = await this.serverModel.findById(serverId).exec();
    if (!server) {
      throw new Error('Server not found');
    }
    if ( server.members.find(u => u.member.toString() === userId) ) {
      throw new Error('User already in server');
    }
    const user = await this.userService.findOne(userId);
    server.members.push({
      member: user,
      status: 'active',
    });
    await server.save();
    return server;
  }

  async remove(id: string): Promise<Server> {
    return this.serverModel.findByIdAndDelete(id);
  }
  async getServerById(id: string): Promise<Server> {
    const server = await this.serverModel.findById(id).exec();
    if (!server) {
      throw new NotFoundException(`Server with ID "${id}" not found`);
    }
    return {
      ...server.toJSON(),
      cover: server.cover ? `${process.env.API_URL || 'http://localhost:3000'}${server.cover}` : null
    };
  }

  async updateServer(
    id: string, 
    updateServerDto: UpdateServerDto, 
    file?: Express.Multer.File
  ): Promise<Server> {
    const server = await this.serverModel.findById(id).exec();
    if (!server) {
      if (file) {
        this.deleteFile(file.filename);
      }
      throw new NotFoundException(`Server with ID "${id}" not found`);
    }

    if (file) {
      if (server.cover) {
        this.deleteFile(server.cover.split('/').pop());
      }
      updateServerDto.cover = `/uploads/servers/${file.filename}`;
    }

    const updatedServer = await this.serverModel
      .findByIdAndUpdate(id, updateServerDto, { new: true })
      .exec();

    return {
      ...updatedServer.toJSON(),
      cover: updatedServer.cover ? `${process.env.API_URL || 'http://localhost:3000'}${updatedServer.cover}` : null
    };
  }

  async deleteServer(id: string): Promise<Server> {
    const server = await this.serverModel.findById(id).exec();
    if (!server) {
      throw new NotFoundException(`Server with ID "${id}" not found`);
    }

    if (server.cover) {
      this.deleteFile(server.cover.split('/').pop());
    }

    return this.serverModel.findByIdAndDelete(id).exec();
  }

  private deleteFile(filename: string): void {
    try {
      const fullPath = path.join(this.uploadsPath, filename);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    } catch (error) {
      console.error(`Error deleting file: ${error.message}`);
    }
  }
}

