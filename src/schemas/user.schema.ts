import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

export type UserDocument = User & Document; // ✅ Define and export UserDocument

export enum UserRole {
  ADMIN = 'admin',
  PARENT = 'parent',
  CHILD = 'child',
}

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

  @Prop({ enum: UserRole, default: UserRole.PARENT })
  role: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  parentId?: mongoose.Schema.Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
