import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Subjects')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Create subject for a child user' })
  create(@Body() dto: CreateSubjectDto) {
    return this.subjectsService.create(dto.childId, dto);
  }

  @Get('me')
  @ApiOperation({ summary: 'Get all subjects for logged-in child' })
  findMySubjects(@Req() req) {
    return this.subjectsService.findAllByChild(req.user._id);
  }

  @Get('me/:id')
  @ApiOperation({ summary: 'Get a specific subject for logged-in child' })
  findOne(@Req() req, @Param('id') id: string) {
    return this.subjectsService.findOneByChild(id, req.user._id);
  }

  @Patch('me/:id')
  @ApiOperation({ summary: 'Update a subject for logged-in child' })
  update(@Req() req, @Param('id') id: string, @Body() dto: UpdateSubjectDto) {
    return this.subjectsService.update(id, req.user._id, dto);
  }

  @Delete('me/:id')
  @ApiOperation({ summary: 'Delete a subject for logged-in child' })
  remove(@Req() req, @Param('id') id: string) {
    return this.subjectsService.remove(id, req.user._id);
  }
}
