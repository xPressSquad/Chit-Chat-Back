// src/notification/notification.controller.ts
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notification } from './notification.schema';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  async findAll(): Promise<Notification[]> {
    return this.notificationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Notification> {
    return this.notificationService.findOne(id);
  }

  @Post()
  async create(@Body() createNotificationDto: Partial<Notification>): Promise<Notification> {
    return this.notificationService.create(createNotificationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Notification> {
    return this.notificationService.remove(id);
  }
}
