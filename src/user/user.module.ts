// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [{
    provide: 'UserRepositoryInterface',
    useClass: UserRepository
  }],
  controllers: [UserController],
})
export class UserModule {}
