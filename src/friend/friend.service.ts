// src/friend/friend.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Friend, FriendDocument } from './friend.schema';
import { User, UserDocument } from '../user/user.schema';
import { UserModule } from "../user/user.module";

@Injectable()
export class FriendService {
  constructor(
    @InjectModel(Friend.name) private friendModel: Model<FriendDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

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

  async sendInvitation(senderId: string, recipientId: string): Promise<Friend> {

    if (!Types.ObjectId.isValid(senderId) || !Types.ObjectId.isValid(recipientId)) {
      throw new BadRequestException('Invalid senderId or recipientId');
    }

    const sender = await this.userModel.findOne({ _id: senderId });
    const reciever = await this.userModel.findOne({ _id: recipientId });

    if(!sender || !reciever)
    {
      throw new BadRequestException("the reciever or the recipient does not exist");
    }

    const IsInvitationAlreadyExist = await this.friendModel.find({user1: senderId});
    if(IsInvitationAlreadyExist.length > 0)
      throw new BadRequestException("You Already Sent an invitation");

    const existingInvitation = await this.userModel.findOne({
      $or: [
        { user1: senderId, user2: recipientId },
        { user1: recipientId, user2: senderId },
      ],
    });

    if(existingInvitation)
    {
      throw new BadRequestException('Friend invitation already exists or users are already friends.');
    }

    const invitation = new this.friendModel({
      user1: senderId,
      user2: recipientId,
    });


    return await invitation.save();

  }


  async AcceptInvitation(id) {

    if(!Types.ObjectId.isValid(id))
      throw new BadRequestException('The Invitation Id Is Not Valid');

    const invitation = await this.friendModel.findById({_id: id});
    if(!invitation)
        throw new BadRequestException('No Invitation Found');

    invitation.status = 'approved';
    await invitation.save();
    return invitation
  }


  async RefuseInvitation(id) {
    if(!Types.ObjectId.isValid(id))
      throw new BadRequestException('The Invitation Id Is Not Valid');

    const invitation = await this.friendModel.findById({_id: id});
    if(!invitation)
      throw new BadRequestException('No Invitation Found');

    invitation.status = 'deleted';
    await invitation.save();
    return invitation;
  }



  async listSentInvitations(id: string): Promise<Friend[]> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid User ID');
    }

    const userExists = await this.userModel.exists({ _id: id });
    if (!userExists) {
      throw new BadRequestException('User not found');
    }

    const invitations = await this.friendModel.find({ user2: id });
    return invitations;
  }

}
