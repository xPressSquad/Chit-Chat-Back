// src/friend/friend.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Friend, FriendDocument } from './friend.schema';

@Injectable()
export class FriendService {
  constructor(@InjectModel(Friend.name) private friendModel: Model<FriendDocument>) {}

  async findAll(): Promise<Friend[]> {
    return this.friendModel.find().exec();
  }

  async findOne(id: string): Promise<Friend> {
    return this.friendModel.findById(id).exec();
  }

  async create(friendData: Partial<Friend>): Promise<Friend> {
    const friend = new this.friendModel(friendData);
    return friend.save();
  }

  async remove(id: string): Promise<Friend> {
    return this.friendModel.findByIdAndDelete(id);
  }
}
