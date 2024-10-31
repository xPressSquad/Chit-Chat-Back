// src/friend/friend.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Friend, FriendSchema } from './friend.schema';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Friend.name, schema: FriendSchema }])],
  providers: [FriendService],
  controllers: [FriendController],
  exports: [FriendService],
})
export class FriendModule {}
