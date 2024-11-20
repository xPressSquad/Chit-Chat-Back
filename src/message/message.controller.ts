// src/message/message.controller.ts
import { Controller, Get, Post, Body, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './message.schema';
import { CreateMessageDTO } from './dto/message.dto';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  async findAll(): Promise<Message[]> {
    return this.messageService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Message> {
    return this.messageService.findOne(id);
  }

  // @Post()
  // @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  // async create(@Body() createMessageDto: CreateMessageDTO): Promise<Message> {

  //   return this.messageService.create(createMessageDto);
  // }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Message> {
    return this.messageService.remove(id);
  }
}
