import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ExamService } from './exam.service';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { AutoExamDto } from './dto/auto-exam.dto';
import { AssessLearningMethodDto } from './dto/assess-learning-method.dto';
import { SubmittedAnswerDto } from './dto/submit-exam.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('Exam')
@Controller('exams')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post()
  @ApiOperation({ summary: 'Create new exam' })
  create(@Body() dto: CreateExamDto) {
    return this.examService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all exams' })
  findAll() {
    return this.examService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one exam by id' })
  findOne(@Param('id') id: string) {
    return this.examService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update exam by id' })
  update(@Param('id') id: string, @Body() dto: UpdateExamDto) {
    return this.examService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete exam by id' })
  remove(@Param('id') id: string) {
    return this.examService.remove(id);
  }

  @Post('generate')
  @ApiOperation({ summary: 'Generate exam using AI (Gemini)' })
  generate(@Body() autoExamDto: AutoExamDto) {
    return this.examService.generateAndCreateExam(autoExamDto);
  }

  @Post('assess-learning-method')
  @ApiOperation({ summary: 'Assess a learning method for a subject' })
  @ApiBody({ type: AssessLearningMethodDto })
  assess(@Body() dto: AssessLearningMethodDto) {
    return this.examService.assessLearningMethod(dto);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all exams by user ID' })
  findByUser(@Param('userId') userId: string) {
    return this.examService.findByUserId(userId);
  }

  @Post('submit/:userId/:examId')
  @ApiOperation({ summary: 'Submit an exam and calculate score' })
  @ApiBody({ type: [SubmittedAnswerDto] })
  submitExam(
    @Param('userId') userId: string,
    @Param('examId') examId: string,
    @Body() submittedAnswers: SubmittedAnswerDto[],
  ) {
    return this.examService.submitExam(userId, examId, submittedAnswers);
  }
}
