import { PartialType } from '@nestjs/swagger';
import { CreateLearningMethodDto } from './create-learning-method.dto';

export class UpdateLearningMethodDto extends PartialType(CreateLearningMethodDto) {}
