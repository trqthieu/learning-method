import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type LearningMethodDocument = LearningMethod & Document;

@Schema({ timestamps: true })
export class LearningMethod {
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  childId: Types.ObjectId;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;
}

export const LearningMethodSchema =
  SchemaFactory.createForClass(LearningMethod);
