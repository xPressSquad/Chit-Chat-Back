import { Model } from "mongoose";
import { UserRepositoryInterface } from "./interfaces/user.repository.interface";
import { User, userDocument } from "./user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository implements UserRepositoryInterface {

    constructor(@InjectModel(User.name) private userModel: Model<userDocument>){}

    async getAllUsers(): Promise<userDocument[]> {
        try{
            const users = await this.userModel.find();
            return users;
        }catch(err: any){
            throw err
        }
    }
}