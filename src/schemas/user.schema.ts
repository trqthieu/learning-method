import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

export type UserDocument = User & Document; // ✅ Define and export UserDocument

@Schema({ timestamps: true })
export class User {
  _id: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  passwordHash: string;

  @Prop()
  providerId: string;

  @Prop()
  provider: string;

  @Prop({ required: true, enum: ['parent', 'child', 'admin'], default: 'parent' })
  role: string;

  @Prop()
  avatar: string;

  @Prop()
  address: string;

  @Prop({ default: false })
  isBlocked: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  parentId?: mongoose.Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
