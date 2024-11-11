// src/friend/friend.controller.ts
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FriendService } from './friend.service';
import { Friend } from './friend.schema';

@Controller('friends')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Get()
  async findAll(): Promise<Friend[]> {
    return this.friendService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Friend> {
    return this.friendService.findOne(id);
  }

  @Post()
  async create(@Body() createFriendDto: Partial<Friend>): Promise<Friend> {
    return this.friendService.create(createFriendDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Friend> {
    return this.friendService.remove(id);
  }
}
