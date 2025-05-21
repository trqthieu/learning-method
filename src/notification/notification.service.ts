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

  async sendNotificationToStudent(userId: string, title: string, message: string) {
    const notification = new this.model({
      user: userId,
      title,
      message,
      read: false,
      createdAt: new Date(),
    });
    await notification.save();
  }

  async notifyResult(userId: string, examResult: any) {
    const scorePercent = examResult.correctPercentage;

    if (scorePercent < 50) {
      await this.sendNotificationToStudent(
        userId,
        'Warning: Learning method effectiveness',
        `Your recent exam score is ${scorePercent}%. It appears the current learning method may need improvement. Please consult your instructor for advice.`
      );
    } else {
      await this.sendNotificationToStudent(
        userId,
        'Good job on your recent exam!',
        `You scored ${scorePercent}% on your exam "${examResult.exam.title}". Keep up the good work and continue applying your learning method!`
      );
    }
  }

  async getNotificationsByUser(userId: string) {
    return this.model
      .find({ user: userId })
      .sort({ createdAt: -1 })
      .exec();
  }
}
