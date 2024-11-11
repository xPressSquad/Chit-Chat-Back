// src/server/server.controller.ts
import { Controller, Post, Get, Param, Body, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { ServerService } from './server.service';
import { CreateServerDto } from './dto/create-server.dto';

@Controller('servers')
export class ServerController {
  constructor(private readonly serverService: ServerService) {}

  // Create a new server
  @Post()
  async createServer(@Body() createServerDto: CreateServerDto) {
    try {
      return await this.serverService.createServer(createServerDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      } else {
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  // Get all servers
  @Get()
  async getAllServers() {
    try {
      return await this.serverService.getAllServers();
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Get a server by ID
  @Get(':id')
  async getServerById(@Param('id') id: string) {
    try {
      return await this.serverService.getServerById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}