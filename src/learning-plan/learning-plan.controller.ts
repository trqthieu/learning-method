import { Controller, Post, Get, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';

import { ApiBearerAuth, ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { LearningPlansService } from './learning-plan.service';
import { CreateLearningPlanDto } from './dto/create-learning-plan.dto';
import { UpdateLearningPlanDto } from './dto/update-learning-plan.dto';

@ApiTags('Learning Plans')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('plans')
export class LearningPlansController {
  constructor(private readonly service: LearningPlansService) {}

  @Post()
//   @Roles(UserRole.ADMIN, UserRole.PARENT)
//   @ApiOperation({ summary: 'Tạo kế hoạch học tập' })
  create(@Body() dto: CreateLearningPlanDto) {
    return this.service.create(dto);
  }

  @Get()
//   @Roles(UserRole.ADMIN, UserRole.PARENT, UserRole.CHILD)
//   @ApiOperation({ summary: 'Lấy danh sách kế hoạch học tập' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
//   @Roles(UserRole.ADMIN, UserRole.PARENT, UserRole.CHILD)
//   @ApiOperation({ summary: 'Lấy chi tiết kế hoạch học tập' })
  @ApiParam({ name: 'id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
//   @Roles(UserRole.ADMIN, UserRole.PARENT)
//   @ApiOperation({ summary: 'Cập nhật kế hoạch học tập' })
  @ApiParam({ name: 'id' })
  update(@Param('id') id: string, @Body() dto: UpdateLearningPlanDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
//   @Roles(UserRole.ADMIN)
//   @ApiOperation({ summary: 'Xoá kế hoạch học tập' })
  @ApiParam({ name: 'id' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
