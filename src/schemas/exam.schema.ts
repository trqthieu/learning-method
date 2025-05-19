import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ExamDocument = Exam & Document;

@Schema({ _id: true })
export class Question {
  @Prop({ required: true })
  question: string;

  @Prop({ type: [String], required: true })
  answers: string[];

  @Prop({ required: true })
  correct: number;
}

@Schema({ timestamps: true })
export class Exam {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  duration: number;

  @Prop({ type: [Question], required: true })
  content: Question[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'LearningMethod' })
  method: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' })
  subject: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: mongoose.Types.ObjectId;
}

export const ExamSchema = SchemaFactory.createForClass(Exam);
