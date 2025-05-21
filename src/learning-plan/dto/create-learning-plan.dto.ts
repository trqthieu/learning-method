// create-learning-plan.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateLearningPlanDto {
  @ApiProperty()
  @IsMongoId()
  childId: string;

  @ApiProperty()
  @IsMongoId()
  subjectId: string;

  @ApiProperty()
  @IsMongoId()
  methodId: string;

  @ApiProperty()
  @IsDateString()
  date: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  note?: string;
}
