// src/server/server.controller.ts
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ServerService } from './server.service';
import { Server } from './server.schema';

@Controller('servers')
export class ServerController {
  constructor(private readonly serverService: ServerService) {}

  @Get()
  async findAll(): Promise<Server[]> {
    return this.serverService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Server> {
    return this.serverService.findOne(id);
  }

  @Post()
  async create(@Body() createServerDto: Partial<Server>): Promise<Server> {
    return this.serverService.create(createServerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Server> {
    return this.serverService.remove(id);
  }
}
