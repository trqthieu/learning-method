import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLearningPlanDto } from './dto/create-learning-plan.dto';
import { UpdateLearningPlanDto } from './dto/update-learning-plan.dto';
import { LearningPlan, LearningPlanDocument } from 'src/schemas/learning-plan.schema';

@Injectable()
export class LearningPlansService {
  constructor(@InjectModel(LearningPlan.name) private model: Model<LearningPlanDocument>) {}

  async create(dto: CreateLearningPlanDto) {
    return this.model.create(dto);
  }

  async findAll() {
    return this.model
      .find()
      .populate('childId')
      .populate('subjectId')
      .populate('methodId')
      .exec();
  }

  async findOne(id: string) {
    const plan = await this.model
      .findById(id)
      .populate('childId')
      .populate('subjectId')
      .populate('methodId')
      .exec();

    if (!plan) throw new NotFoundException('Learning plan not found');
    return plan;
  }

  async update(id: string, dto: UpdateLearningPlanDto) {
    const plan = await this.model
      .findByIdAndUpdate(id, dto, { new: true })
      .populate('childId')
      .populate('subjectId')
      .populate('methodId')
      .exec();

    if (!plan) throw new NotFoundException('Learning plan not found');
    return plan;
  }

  async remove(id: string) {
    const result = await this.model.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Learning plan not found');
  }
}
