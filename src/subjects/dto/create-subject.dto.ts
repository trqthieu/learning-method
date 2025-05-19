import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateSubjectDto {
  @ApiProperty({ example: 'Maths' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '6647fa31e587bfc42f34c80e' })
  @IsMongoId()
  @IsNotEmpty()
  childId: string;
}