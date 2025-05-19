import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Exam, ExamDocument } from 'src/schemas/exam.schema';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { AiService } from 'src/ai/ai.service';
import { extractJson } from 'src/common/extract-json';
import { AssessLearningMethodDto } from './dto/assess-learning-method.dto';
import { AutoExamDto } from './dto/auto-exam.dto';
import { ExamResult, ExamResultDocument } from 'src/schemas/exam-result.schema';

@Injectable()
export class ExamService {
  constructor(
    @InjectModel(Exam.name) private examModel: Model<ExamDocument>,
    @InjectModel(ExamResult.name)
    private resultModel: Model<ExamResultDocument>,
    private readonly aiService: AiService,
  ) {}

  async generateAndCreateExam(autoExamDto: AutoExamDto): Promise<Exam> {
    try {
      const { topic, method, userId, subjectId, methodId } = autoExamDto;
      //       const prompt = `Generate 3 multiple-choice questions about ${topic}.
      // Return JSON format with this structure:
      // {
      //   "title": "Vietnam Geography Quiz",
      //   "duration": 10,
      //   "content": [
      //     {
      //       "question": "What is the capital of Vietnam?",
      //       "answers": ["Hanoi", "Ho Chi Minh City", "Da Nang", "Hue"],
      //       "correct": 0
      //     },
      //     ...
      //   ]
      // }`;

      const prompt = `You are an education expert.

Generate 3 multiple-choice questions to help a student study the topic: **${topic}** using the learning method: **${method}**.

Use this JSON format:
{
  "title": "${topic} Quiz using ${method}",
  "duration": 10,
  "content": [
    {
      "question": "Your question here?",
      "answers": ["Option A", "Option B", "Option C", "Option D"],
      "correct": 0
    },
    ...
  ]
}`;

      const rawText = await this.aiService.generateExam(prompt);
      const cleanText = extractJson(rawText);

      const parsed: CreateExamDto = JSON.parse(cleanText);
      const newExam = {
        ...parsed,
        user: userId,
        subject: subjectId,
        method: methodId,
      };
      return await this.examModel.create(newExam);
    } catch (error) {
      console.log(error);

      throw new BadRequestException('Failed to parse AI response');
    }
  }

  async assessLearningMethod(data: AssessLearningMethodDto) {
    try {
      const prompt = `
You are an education expert. Assess the learning method below for a student studying "${data.subjectName}".

Learning Method: "${data.learningMethodName}"

Return a JSON object with the following structure:

{
  "advantages": [ "..." ],
  "disadvantages": [ "..." ],
  "suggestions": [ "..." ]
}
`;

      const rawText = await this.aiService.generateText(prompt);

      const cleanText = rawText.replace(/```json|```/g, '').trim();
      return JSON.parse(cleanText);
    } catch (err) {
      throw new Error('Gemini returned invalid JSON');
    }
  }

  async create(createExamDto: CreateExamDto): Promise<Exam> {
    return await this.examModel.create(createExamDto);
  }

  async findAll(): Promise<Exam[]> {
    return await this.examModel
      .find()
      .populate('user')
      .populate('subject')
      .populate('method');
  }

  async findOne(id: string): Promise<Exam> {
    return await this.examModel
      .findById(id)
      .populate('user')
      .populate('subject')
      .populate('method');
  }

  async update(id: string, updateExamDto: UpdateExamDto): Promise<Exam> {
    return await this.examModel.findByIdAndUpdate(id, updateExamDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<Exam> {
    return await this.examModel.findByIdAndDelete(id);
  }

  async findByUserId(userId: string) {
    return this.examModel
      .find({ user: userId })
      .populate('user')
      .populate('subject')
      .populate('method');
  }

  async submitExam(
    userId: string,
    examId: string,
    submittedAnswers: { questionIndex: number; selectedAnswer: number }[],
  ): Promise<ExamResult> {
    const exam = await this.examModel.findById(examId);
    if (!exam) throw new NotFoundException('Exam not found');

    let correct = 0;

    submittedAnswers.forEach(({ questionIndex, selectedAnswer }) => {
      const correctAnswer = exam.content[questionIndex]?.correct;
      if (selectedAnswer === correctAnswer) correct++;
    });

    const percentage = parseFloat(
      ((correct / exam.content.length) * 100).toFixed(2),
    );

    const result = new this.resultModel({
      user: userId,
      exam: examId,
      score: correct,
      total: exam.content.length,
      correctPercentage: percentage,
      submittedAnswers: submittedAnswers,
    });

    return result.save();
  }

  async getResultsByUser(userId: string) {
    return this.resultModel.find({ user: userId }).populate('exam');
  }
}
