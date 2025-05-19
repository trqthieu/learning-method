import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ExamResult, ExamResultSchema } from 'src/schemas/exam-result.schema';
import { Exam, ExamSchema } from 'src/schemas/exam.schema';
import { Subject, SubjectSchema } from 'src/schemas/subject.schema';
import { LearningMethod, LearningMethodSchema } from 'src/schemas/learning-method.schema';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ExamResult.name, schema: ExamResultSchema },
      { name: Exam.name, schema: ExamSchema },
      { name: Subject.name, schema: SubjectSchema },
      { name: LearningMethod.name, schema: LearningMethodSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
