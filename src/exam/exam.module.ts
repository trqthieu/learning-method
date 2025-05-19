import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { Exam, ExamSchema } from 'src/schemas/exam.schema';
import { AiModule } from 'src/ai/ai.module';
import { ExamResult, ExamResultSchema } from 'src/schemas/exam-result.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Exam.name, schema: ExamSchema },
      { name: ExamResult.name, schema: ExamResultSchema },
    ]),
    AiModule,
  ],
  providers: [ExamService],
  controllers: [ExamController],
})
export class ExamModule {}
