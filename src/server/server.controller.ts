// src/server/server.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Inject, HttpException, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { ServerService } from './server.service';
import { Server } from './server.schema';
import { ServerRepositoryInterface } from './interfaces/server.repository.interface';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { User } from 'src/user/user.schema';

@Controller('servers')
export class ServerController {
  constructor(
    private readonly serverService: ServerService,
    @Inject('ServerRepositoryInterface') private readonly serverRepository: ServerRepositoryInterface
  ) {}

  @Get('get/servers')
  @UseGuards(AuthGuard)
  async findAll(@Request() request): Promise<{statusCode: number , data: Server[]}> {
    try{
      
      const userId = request.user._id;
      const servers = await this.serverRepository.getUserServers(userId);
      return {
        statusCode: HttpStatus.OK,
        data: servers
      }
    }catch(err: any){
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Failed to get the users',
          error: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
  }
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
