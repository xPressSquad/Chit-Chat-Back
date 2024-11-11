import { Controller, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { OriginGuard } from "../common/guards/origin.guard";

@Controller('auth')
export class AuthController {
    constructor() {}

    @Post('create/user')
    @UseGuards(OriginGuard)
    createUser(){
        return {
            statusCode: HttpStatus.OK,
            message: 'Hello'
        };
    }
}