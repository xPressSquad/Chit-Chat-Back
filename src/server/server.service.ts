// src/server/server.service.ts
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Server } from './server.schema';
import { CreateServerDto } from './dto/create-server.dto';
import { Logger } from '@nestjs/common';

@Injectable()
export class ServerService {
  private readonly logger = new Logger(ServerService.name);

  constructor(@InjectModel(Server.name) private serverModel: Model<Server>) {}

  // Create a new server
  async createServer(createServerDto: CreateServerDto): Promise<Server> {
    try {
      // Check if server with the same name already exists
      const existingServer = await this.serverModel.findOne({ name: createServerDto.name }).exec();
      if (existingServer) {
        this.logger.error(`Server with name "${createServerDto.name}" already exists`);
        throw new NotFoundException(`Server with name "${createServerDto.name}" already exists`);
      }

      // Create a new server
      const newServer = new this.serverModel(createServerDto);
      const savedServer = await newServer.save();
      this.logger.log(`Created new server: ${savedServer._id}`);
      return savedServer;
    } catch (error) {
      // Handle specific error types
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        this.logger.error(`Unexpected error creating server: ${error.message}`);
        throw new InternalServerErrorException('Error creating server');
      }
    }
  }

  // Get all servers
  async getAllServers(): Promise<Server[]> {
    try {
      return await this.serverModel.find().exec();
    } catch (error) {
      this.logger.error(`Error fetching servers: ${error.message}`);
      throw new InternalServerErrorException('Error fetching servers');
    }
  }

  // Get a specific server by ID
  async getServerById(id: string): Promise<Server> {
    try {
      const server = await this.serverModel.findById(id).exec();
      if (!server) {
        this.logger.error(`Server with ID "${id}" not found`);
        throw new NotFoundException(`Server with ID "${id}" not found`);
      }
      return server;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        this.logger.error(`Error fetching server: ${error.message}`);
        throw new InternalServerErrorException('Error fetching server');
      }
    }
  }
}

// import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Server } from './server.schema';
// import { CreateServerDto } from './dto/create-server.dto';

// @Injectable()
// export class ServerService {
//   constructor(@InjectModel(Server.name) private serverModel: Model<Server>) {}

//   // Create a new server
//   async createServer(createServerDto: CreateServerDto): Promise<Server> {
//     try {
//       const { name, cover, admin, members, visibility, type } = createServerDto;
//       const existingServer = await this.serverModel.findOne({ name }).exec();

//       if (existingServer) {
//         throw new NotFoundException(`Server with name "${name}" already exists`);
//       }

//       const newServer = new this.serverModel({ name, cover, admin, members, visibility, type });
//       return await newServer.save();
//     } catch (error) {
//       if (error instanceof NotFoundException) {
//         throw error;
//       } else {
//         throw new InternalServerErrorException('Error creating server');
//       }
//     }
//   }

//   // Get all servers
//   async getAllServers(): Promise<Server[]> {
//     try {
//       return await this.serverModel.find().exec();
//     } catch (error) {
//       throw new InternalServerErrorException('Error fetching servers');
//     }
//   }

//   // Get a specific server by ID
//   async getServerById(id: string): Promise<Server> {
//     try {
//       const server = await this.serverModel.findById(id).exec();
//       if (!server) {
//         throw new NotFoundException(`Server with ID "${id}" not found`);
//       }
//       return server;
//     } catch (error) {
//       if (error instanceof NotFoundException) {
//         throw error;
//       } else {
//         throw new InternalServerErrorException('Error fetching server');
//       }
//     }
//   }
// }

