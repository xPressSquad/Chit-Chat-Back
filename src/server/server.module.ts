// src/server/server.module.ts
import { Module, forwardRef } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { ServerController } from './server.controller';
import { UserModule } from '../user/user.module';
import { ServerService } from './server.service';
import { Server, ServerSchema } from './server.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Server.name, schema: ServerSchema }]),
    forwardRef(() => UserModule),
    MulterModule.register({
      dest: './uploads/servers',
    }),
  ],
  controllers: [ServerController],
  providers: [ServerService],
  exports: [ServerService],
})
export class ServerModule {}