import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject, SubjectDocument } from 'src/schemas/subject.schema';

@Injectable()
export class SubjectsService {
  constructor(@InjectModel(Subject.name) private subjectModel: Model<SubjectDocument>) {}

  async create(childId: string, dto: CreateSubjectDto) {
    return this.subjectModel.create({ ...dto, childId });
  }

  async findAllByChild(childId: string) {
    return this.subjectModel.find({ childId });
  }

  async findOneByChild(id: string, childId: string) {
    const subject = await this.subjectModel.findOne({ _id: id, childId });
    if (!subject) throw new NotFoundException('Subject not found');
    return subject;
  }

  async update(id: string, childId: string, dto: UpdateSubjectDto) {
    const subject = await this.subjectModel.findOneAndUpdate(
      { _id: id, childId },
      dto,
      { new: true },
    );
    if (!subject) throw new NotFoundException('Subject not found');
    return subject;
  }

  async remove(id: string, childId: string) {
    const result = await this.subjectModel.findOneAndDelete({ _id: id, childId });
    if (!result) throw new NotFoundException('Subject not found');
    return { message: 'Deleted successfully' };
  }
}