import { Controller, Post, Body, Get, Param, Put, Query } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationController {
  constructor(private readonly service: NotificationService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo thông báo hệ thống' })
  create(@Body() dto: CreateNotificationDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách thông báo (toàn bộ hoặc theo user)' })
  @ApiQuery({ name: 'userId', required: false })
  findAll(@Query('userId') userId?: string) {
    return this.service.findAll(userId);
  }

  @Put(':id/read')
  @ApiOperation({ summary: 'Đánh dấu thông báo đã đọc' })
  markRead(@Param('id') id: string) {
    return this.service.markAsRead(id);
  }

  @Get('user/:userId')
  async getNotificationsByUser(@Param('userId') userId: string) {
    return this.service.getNotificationsByUser(userId);
  }
}
