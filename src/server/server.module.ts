import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServerController } from './server.controller';
import { ServerRepository } from './server.repository';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { Server, ServerSchema } from './server.schema';
import { ServerService } from './server.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Server.name, schema: ServerSchema }]),
    AuthModule,
    MulterModule.register({
      dest: './uploads/servers',
    }),],
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
