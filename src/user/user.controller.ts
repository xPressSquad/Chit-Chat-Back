// src/user/user.controller.ts
import { Controller, Get, Param, Delete, Inject, HttpStatus, HttpException, UseGuards } from '@nestjs/common';
import { UserRepositoryInterface } from './interfaces/user.repository.interface';
import { userDocument } from './user.schema';
import { AuthGuard } from '../common/guards/auth.guard';


@Controller('users')
export class UserController {
  constructor(@Inject('UserRepositoryInterface') private readonly userRepository: UserRepositoryInterface) {}

  @Get('/get/all')
  @UseGuards(AuthGuard)
  async findAll(): Promise<{ statusCode: number; data: userDocument[] }> {
    try{
      const users = await this.userRepository.getAllUsers();
      return {
        statusCode: HttpStatus.OK,
        data: users
      }
    }catch(err:any){
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Failed to get the users',
          error: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(id);
  // }
}