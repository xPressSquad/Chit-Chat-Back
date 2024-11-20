import { Injectable } from "@nestjs/common";
import { CreateMessageDTO } from "./dto/message.dto";
import { MessageRepositoryInterface } from "./interfaces/message.repository.interface";
import { Message } from "./message.schema";
import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class MessageRepository implements MessageRepositoryInterface {

    constructor(@InjectModel(Message.name) private readonly messageModel: Model<Message>) { }

    async createMessage(createMessageDTO: CreateMessageDTO, user_id: Types.ObjectId): Promise<Message> {
        try {
            const message = await this.messageModel.create({
                message: createMessageDTO.message,
                server_id: createMessageDTO.server_id,
                user_id: user_id,
                deleted: 'false',
            });
            if (!message) {
                throw new Error("message doesn't created");
            }
            return message;
        } catch (err) {
            throw err
        }
    }

    async getAllMessages(server_id: Types.ObjectId): Promise<Message[]> {
        try {
            return await this.messageModel.find({ server_id: server_id });
        } catch (err: any) {
            throw err;
        }
    }
}