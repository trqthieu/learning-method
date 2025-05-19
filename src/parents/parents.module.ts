// src/parents/parents.module.ts
import { Module } from '@nestjs/common';
import { ParentsController } from './parents.controller';
import { ParentsService } from './parents.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [ParentsController],
  providers: [ParentsService],
})
export class ParentsModule {}
