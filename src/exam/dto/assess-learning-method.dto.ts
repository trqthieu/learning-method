// assess-learning-method.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class AssessLearningMethodDto {
  @ApiProperty({ example: 'Mathematics' })
  subjectName: string;

  @ApiProperty({ example: 'Spaced Repetition' })
  learningMethodName: string;
}
