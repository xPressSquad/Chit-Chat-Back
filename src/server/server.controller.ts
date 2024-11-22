import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ServerService } from './server.service';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { Server } from './server.schema';

@Controller('servers')
export class ServerController {
  constructor(private readonly serverService: ServerService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: './uploads/servers',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
        }
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
      }
    })
  )
  async createServer(
    @Body() createServerDto: CreateServerDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
  
    return this.serverService.createServer(createServerDto, file);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: './uploads/servers',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
        }
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
      }
    })
  )
  async updateServer(
    @Param('id') id: string,
    @Body() updateServerDto: UpdateServerDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    return this.serverService.updateServer(id, updateServerDto, file);
  }

  // gell all servers
  @Get()
  async getAllServers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number
  ) {
    return this.serverService.getAllServers(page, limit);
  }

  // get server by id
  @Get(':id')
  async getServerById(@Param('id') id: string) {
    return this.serverService.getServerById(id);
  }

  // delete server by id

  @Delete(':id')
  async deleteServer(@Param('id') id: string) {
    return this.serverService.deleteServer(id);
  }

  @Get('/invite/:serverId/:userId')
  async inviteToServer(@Param('userId') userId: string, @Param('serverId') serverId: string): Promise<Server> {
    return this.serverService.joinUser(serverId, userId);
  }

}
