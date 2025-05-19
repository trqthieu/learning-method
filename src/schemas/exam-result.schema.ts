// exam-result.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ExamResultDocument = ExamResult & Document;

@Schema({ timestamps: true })
export class ExamResult {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true })
  exam: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  score: number;

  @Prop({ required: true })
  total: number;

  @Prop({ required: true })
  correctPercentage: number;

  @Prop()
  submittedAnswers: {
    questionIndex: number;
    selectedAnswer: number;
  }[];
}

export const ExamResultSchema = SchemaFactory.createForClass(ExamResult);
