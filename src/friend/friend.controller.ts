// src/friend/friend.controller.ts
import { Controller, Get, Post, Body, Param, Delete, BadRequestException } from "@nestjs/common";
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




  // send invitation
  @Post('invite')
  async sendInvitation(@Body('senderId') senderId: string, @Body('recipientId') recipientId: string,): Promise<Friend> {
    try {
      return  await this.friendService.sendInvitation(senderId, recipientId);
    }catch (error)
    {
      throw new BadRequestException(error.message);
    }
  }

  @Post('acceptInvitation/:id')
  async acceptInvitation(@Param('id') id: string)
  {
    try {
        return await this.friendService.AcceptInvitation(id);
    }catch (error)
    {
      throw new BadRequestException(error.message);
    }
  }


  @Post('refuseInvitation/:id')
  async refuseInvitation(@Param('id') id: string)
  {
    try {

      return await this.friendService.RefuseInvitation(id);
    }catch (error)
    {
      throw new BadRequestException(error.message);
    }
  }

  @Get('SeeAllInvitations/:id')
  async  SeeAllInvitation(@Param('id') id: string): Promise<Friend[]> {
    try {
      return await this.friendService.listSentInvitations(id);
    }catch (error)
    {
      throw new BadRequestException(error.message);
    }
  }

}
