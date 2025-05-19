import { IsString, IsNumber, ValidateNested, ArrayMinSize, IsArray, Min, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class QuestionDto {
  @ApiProperty()
  @IsString()
  question: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @ArrayMinSize(2)
  answers: string[];

  @ApiProperty({ description: 'Index of correct answer' })
  @IsNumber()
  @Min(0)
  correct: number;
}

export class CreateExamDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNumber()
  duration: number;

  @ApiProperty({ type: [QuestionDto] })
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  content: QuestionDto[];

  @ApiProperty()
  @IsMongoId()
  method: string;
  
  @ApiProperty()
  @IsMongoId()
  subject: string;
  
  @ApiProperty()
  @IsMongoId()
  user: string;
}
