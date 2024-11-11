// src/server/server.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Server, ServerSchema } from './server.schema';
import { ServerService } from './server.service';
import { ServerController } from './server.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Server.name, schema: ServerSchema }])],
  providers: [ServerService],
  controllers: [ServerController],
})
export class ServerModule {}