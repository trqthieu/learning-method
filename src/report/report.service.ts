import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExamResult, ExamResultDocument } from '../schemas/exam-result.schema';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(ExamResult.name)
    private examResultModel: Model<ExamResultDocument>,
  ) {}

  async getAllResults() {
    return this.examResultModel.find().populate('user exam').exec();
  }

  async getResultsByUser(userId: string) {
    return this.examResultModel.find({ user: userId }).populate('exam').exec();
  }

  async getResultsByChildIds(childIds: string[]) {
    return this.examResultModel
      .find({ user: { $in: childIds } })
      .populate('exam user')
      .exec();
  }

  async getStatsForUser(userId: string) {
    const results = await this.getResultsByUser(userId);
    const totalExams = results.length;
    const averageScore =
      results.reduce((sum, r) => sum + r.correctPercentage, 0) / totalExams ||
      0;

    return { totalExams, averageScore: parseFloat(averageScore.toFixed(2)) };
  }

  async getStatsForChildren(childIds: string[]) {
    const results = await this.getResultsByChildIds(childIds);
    const statsByChild = {};
    for (const result of results) {
      const user = result.user as any;
      const userId = user?._id.toString();
      if (!statsByChild[userId]) {
        statsByChild[userId] = [];
      }
      statsByChild[userId].push(result.correctPercentage);
    }
    const summary = Object.entries(statsByChild).map(([userId, scores]) => {
      const userScore = scores as any;
      const avg = userScore?.reduce((sum, s) => sum + s, 0) / userScore?.length;
      return {
        userId,
        averageScore: parseFloat(avg.toFixed(2)),
        examsTaken: userScore?.length,
      };
    });
    return summary;
  }
}
