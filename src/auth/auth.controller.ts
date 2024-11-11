import { Controller, Post, UseGuards } from "@nestjs/common";
import { OriginGuard } from "src/common/guards/origin.guard";

@Controller('auth')
export class AuthController {
    constructor() {}

    @Post('create/user')
    @UseGuards(OriginGuard)
    createUser(){
        return 'hello world';
    }
}