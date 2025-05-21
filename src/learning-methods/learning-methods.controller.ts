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
  import { CreateLearningMethodDto } from './dto/create-learning-method.dto';
  import { UpdateLearningMethodDto } from './dto/update-learning-method.dto';
  import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
  import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LearningMethodService } from './learning-methods.service';
  
  @ApiTags('Learning Methods')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Controller('learning-methods')
  export class LearningMethodController {
    constructor(private readonly service: LearningMethodService) {}
  
    @Post()
    create(@Body() dto: CreateLearningMethodDto) {
      return this.service.create(dto);
    }

    @Get()
    findAll() {
      return this.service.findAll();
    }
  
    @Get('child/:childId')
    findAllByChild(@Param('childId') childId: string) {
      return this.service.findAllByChild(childId);
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.service.findOne(id);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateLearningMethodDto) {
      return this.service.update(id, dto);
    }
  
    @Delete(':id')
    delete(@Param('id') id: string) {
      return this.service.delete(id);
    }
  }
  