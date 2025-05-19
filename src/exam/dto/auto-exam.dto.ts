import {
  IsString,
  IsNumber,
  ValidateNested,
  ArrayMinSize,
  IsArray,
  Min,
  IsMongoId,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AutoExamDto {
  @ApiProperty({ default: 'Physics' })
  @IsString()
  topic: string;

  @ApiProperty({ default: 'Spaced Repetition' })
  @IsString()
  method: string;

  @ApiProperty()
  @IsMongoId()
  userId: string;

  @ApiProperty()
  @IsMongoId()
  subjectId: string;

  @ApiProperty()
  @IsMongoId()
  methodId: string;
}
