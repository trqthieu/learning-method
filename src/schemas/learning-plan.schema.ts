import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class LearningPlan {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  childId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Subject', required: true })
  subjectId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'LearningMethod', required: true })
  methodId: Types.ObjectId;

  @Prop({ required: true })
  date: Date;

  @Prop()
  note: string;
}

export type LearningPlanDocument = LearningPlan & Document;
export const LearningPlanSchema = SchemaFactory.createForClass(LearningPlan);
