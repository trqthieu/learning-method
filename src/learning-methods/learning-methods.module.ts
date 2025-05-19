import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LearningMethod, LearningMethodSchema } from 'src/schemas/learning-method.schema';
import { LearningMethodService } from './learning-methods.service';
import { LearningMethodController } from './learning-methods.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LearningMethod.name, schema: LearningMethodSchema }]),
  ],
  providers: [LearningMethodService],
  controllers: [LearningMethodController],
})
export class LearningMethodModule {}
