import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LearningPlansService } from './learning-plan.service';
import { LearningPlansController } from './learning-plan.controller';
import { LearningPlan, LearningPlanSchema } from 'src/schemas/learning-plan.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LearningPlan.name, schema: LearningPlanSchema }]),
  ],
  providers: [LearningPlansService],
  controllers: [LearningPlansController],
})
export class LearningPlanModule {}
