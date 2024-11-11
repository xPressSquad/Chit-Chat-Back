// src/message/message.controller.ts
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './message.schema';

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

  @Post()
  async create(@Body() createMessageDto: Partial<Message>): Promise<Message> {
    return this.messageService.create(createMessageDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Message> {
    return this.messageService.remove(id);
  }
}
