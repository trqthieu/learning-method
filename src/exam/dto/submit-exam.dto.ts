// submit-exam.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class SubmittedAnswerDto {
  @ApiProperty({ example: 0, description: 'Index of the question in the exam content array' })
  questionIndex: number;

  @ApiProperty({ example: 2, description: 'Index of the selected answer' })
  selectedAnswer: number;
}
