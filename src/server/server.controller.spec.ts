// src/servers/server.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ServerController } from './server.controller';
import { ServerService } from './server.service';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { NotFoundException } from '@nestjs/common';

describe('ServerController', () => {
  let controller: ServerController;
  let service: ServerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServerController],
      providers: [
        {
          provide: ServerService,
          useValue: {
            createServer: jest.fn(),
            updateServer: jest.fn(),
            getAllServers: jest.fn(),
            getServerById: jest.fn(),
            deleteServer: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ServerController>(ServerController);
    service = module.get<ServerService>(ServerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createServer', () => {
    it('should call service.createServer with the provided data', async () => {
      const createServerDto = new CreateServerDto();
      const file = { filename: 'test.jpg' } as Express.Multer.File;

      jest.spyOn(service, 'createServer').mockResolvedValue('new server');

      const result = await controller.createServer(createServerDto, file);

      expect(service.createServer).toHaveBeenCalledWith(createServerDto, file);
      expect(result).toBe('new server');
    });
  });

//   describe('updateServer', () => {
//     it('should call service.updateServer with the correct id and data', async () => {
//       const id = '1';
//       const updateServerDto = new UpdateServerDto();
//       const file = { filename: 'updated.jpg' } as Express.Multer.File;

//       jest.spyOn(service, 'updateServer').mockResolvedValue('updated server');

//       const result = await controller.updateServer(id, updateServerDto, file);

//       expect(service.updateServer).toHaveBeenCalledWith(id, updateServerDto, file);
//       expect(result).toBe('updated server');
//     });
//   });

//   describe('getAllServers', () => {
//     it('should call service.getAllServers with default pagination parameters', async () => {
//       const page = 1;
//       const limit = 10;
//       const servers = ['server1', 'server2'];

//       jest.spyOn(service, 'getAllServers').mockResolvedValue(servers);

//       const result = await controller.getAllServers(page, limit);

//       expect(service.getAllServers).toHaveBeenCalledWith(page, limit);
//       expect(result).toBe(servers);
//     });
//   });

//   describe('getServerById', () => {
//     it('should call service.getServerById with the provided id', async () => {
//       const id = '1';
//       const server = { id, name: 'Test Server' };

//       jest.spyOn(service, 'getServerById').mockResolvedValue(server);

//       const result = await controller.getServerById(id);

//       expect(service.getServerById).toHaveBeenCalledWith(id);
//       expect(result).toBe(server);
//     });

//     it('should throw a NotFoundException if server does not exist', async () => {
//       const id = '1';

//       jest.spyOn(service, 'getServerById').mockResolvedValue(null);

//       await expect(controller.getServerById(id)).rejects.toThrow(NotFoundException);
//     });
//   });

//   describe('deleteServer', () => {
//     it('should call service.deleteServer with the correct id', async () => {
//       const id = '1';

//       jest.spyOn(service, 'deleteServer').mockResolvedValue('deleted server');

//       const result = await controller.deleteServer(id);

//       expect(service.deleteServer).toHaveBeenCalledWith(id);
//       expect(result).toBe('deleted server');
//     });
//   });
});
