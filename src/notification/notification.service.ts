import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification, NotificationDocument } from 'src/schemas/notification.schema';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private model: Model<NotificationDocument>,
  ) {}

  async create(dto: CreateNotificationDto) {
    return this.model.create(dto);
  }

  async findAll(userId?: string) {
    const query = userId ? { user: userId } : {};
    return this.model.find(query).sort({ createdAt: -1 }).populate('user');
  }

  async markAsRead(id: string) {
    const notification = await this.model.findById(id);
    if (!notification) throw new NotFoundException('Không tìm thấy thông báo');

    notification.read = true;
    return notification.save();
  }
}
