// src/server/server.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Server, ServerSchema } from './server.schema';
import { ServerService } from './server.service';
import { ServerController } from './server.controller';
import { ServerRepository } from './server.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Server.name, schema: ServerSchema }]), AuthModule],
  providers: [
    ServerService,
    {
      provide: "ServerRepositoryInterface",
      useClass: ServerRepository
    }
  ],
  controllers: [ServerController],
  exports: [ServerService],
})
export class ServerModule {}
