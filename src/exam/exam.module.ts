import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { Exam, ExamSchema } from 'src/schemas/exam.schema';
import { AiModule } from 'src/ai/ai.module';
import { ExamResult, ExamResultSchema } from 'src/schemas/exam-result.schema';
import { NotificationModule } from 'src/notification/notification.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Exam.name, schema: ExamSchema },
      { name: ExamResult.name, schema: ExamResultSchema },
    ]),
    AiModule,
    NotificationModule,
    UsersModule
  ],
  providers: [ExamService],
  controllers: [ExamController],
})
export class ExamModule {}
