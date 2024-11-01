// src/server/server.controller.ts
import { Controller, Get, Param, Delete } from '@nestjs/common';
import { ServerService } from './server.service';

@Controller('servers')
export class ServerController {
  constructor(private readonly serverService: ServerService) {}

  @Get()
  findAll() {
    return this.serverService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serverService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serverService.remove(id);
  }
}