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
  Put,
} from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('Subjects')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post()
  // @Roles(UserRole.ADMIN, UserRole.PARENT)
  // @ApiOperation({ summary: 'Tạo môn học mới (Admin/Parent)' })
  create(@Body() dto: CreateSubjectDto) {
    return this.subjectsService.create(dto);
  }

  @Get()
  // @Roles(UserRole.ADMIN, UserRole.PARENT, UserRole.CHILD)
  // @ApiOperation({ summary: 'Lấy danh sách tất cả môn học (có populate child)' })
  findAll() {
    return this.subjectsService.findAll();
  }

  @Get('child/:childId')
  // @Roles(UserRole.ADMIN, UserRole.PARENT)
  // @ApiOperation({ summary: 'Lấy môn học theo childId' })
  @ApiParam({ name: 'childId', example: '6648c41dd56a77a06c94f109' })
  findByChild(@Param('childId') childId: string) {
    return this.subjectsService.findByChildId(childId);
  }

  @Put(':id')
  // @Roles(UserRole.ADMIN, UserRole.PARENT)
  // @ApiOperation({ summary: 'Cập nhật môn học' })
  @ApiParam({ name: 'id', example: '6648c66dd56a77a06c94f110' })
  update(@Param('id') id: string, @Body() dto: UpdateSubjectDto) {
    return this.subjectsService.update(id, dto);
  }

  @Delete(':id')
  // @Roles(UserRole.ADMIN)
  // @ApiOperation({ summary: 'Xoá môn học' })
  @ApiParam({ name: 'id', example: '6648c66dd56a77a06c94f110' })
  remove(@Param('id') id: string) {
    return this.subjectsService.remove(id);
  }
}
