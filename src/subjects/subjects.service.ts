import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject, SubjectDocument } from 'src/schemas/subject.schema';

@Injectable()
export class SubjectsService {
  constructor(@InjectModel(Subject.name) private subjectModel: Model<SubjectDocument>) {}

  async create(dto: CreateSubjectDto): Promise<Subject> {
    return this.subjectModel.create(dto);
  }

  async findAll(): Promise<Subject[]> {
    return this.subjectModel.find().populate('childId').exec();
  }

  async findByChildId(childId: string): Promise<Subject[]> {
    return this.subjectModel.find({ childId }).populate('childId').exec();
  }

  async update(id: string, dto: UpdateSubjectDto): Promise<Subject> {
    const subject = await this.subjectModel.findByIdAndUpdate(id, dto, { new: true }).populate('childId');
    if (!subject) throw new NotFoundException('Subject not found');
    return subject;
  }

  async remove(id: string): Promise<void> {
    const result = await this.subjectModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Subject not found');
  }
}
