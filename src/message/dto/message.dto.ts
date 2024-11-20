import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateMessageDTO {
    @IsMongoId()
    @IsNotEmpty()
    server_id: string

    @IsNotEmpty()
    @IsString()
    message: string
}