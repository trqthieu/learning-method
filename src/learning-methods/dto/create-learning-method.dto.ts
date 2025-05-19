import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsMongoId, IsDateString } from 'class-validator';

export class CreateLearningMethodDto {
  @ApiProperty({ example: 'Self-paced Reading' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Child reads books alone' })
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '663d92dd15823ad3dbfdebd1' })
  @IsMongoId()
  childId: string;

  @ApiProperty({ example: '2025-06-01' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ example: '2025-06-30' })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
