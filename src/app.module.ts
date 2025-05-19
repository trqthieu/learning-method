import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { ParentsModule } from './parents/parents.module';
import { SubjectsModule } from './subjects/subjects.module';
import { LearningMethodModule } from './learning-methods/learning-methods.module';
import { ExamModule } from './exam/exam.module';
import { ReportModule } from './report/report.module';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(`${process.env.MONGO_URI}`),
    UsersModule,
    AuthModule,
    ParentsModule,
    SubjectsModule,
    LearningMethodModule,
    ExamModule,
    ReportModule
  ],
})
export class AppModule {}
