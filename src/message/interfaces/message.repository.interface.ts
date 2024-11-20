import { Types } from "mongoose";
import { CreateMessageDTO } from "../dto/message.dto";
import { Message } from "../message.schema";

export interface MessageRepositoryInterface {
    createMessage(messageData: object, user_id: Types.ObjectId): Promise<Message>
    getAllMessages(server_id: Types.ObjectId): Promise<Message[]>
}