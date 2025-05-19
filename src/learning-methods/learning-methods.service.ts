import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLearningMethodDto } from './dto/create-learning-method.dto';
import { UpdateLearningMethodDto } from './dto/update-learning-method.dto';
import { LearningMethod, LearningMethodDocument } from 'src/schemas/learning-method.schema';

@Injectable()
export class LearningMethodService {
  constructor(
    @InjectModel(LearningMethod.name)
    private learningMethodModel: Model<LearningMethodDocument>,
  ) {}

  async create(dto: CreateLearningMethodDto) {
    return this.learningMethodModel.create(dto);
  }

  async findAllByChild(childId: string) {
    return this.learningMethodModel.find({ childId }).exec();
  }

  async findOne(id: string) {
    const method = await this.learningMethodModel.findById(id).exec();
    if (!method) throw new NotFoundException('Learning method not found');
    return method;
  }

  async update(id: string, dto: UpdateLearningMethodDto) {
    const updated = await this.learningMethodModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!updated) throw new NotFoundException('Learning method not found');
    return updated;
  }

  async delete(id: string) {
    const result = await this.learningMethodModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Learning method not found');
    return { message: 'Deleted successfully' };
  }
}
