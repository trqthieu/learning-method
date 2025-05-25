// src/users/users.controller.ts
import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  Req,
  UseGuards,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateProfileDto, UpdateUserDto } from './dto/update-profile.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@UseGuards(JwtAuthGuard)
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Get user profile
  @Get('profile')
  async getProfile(@Req() req) {
    console.log(req.user);

    return this.usersService.getProfile(req.user._id);
  }

  // Update user profile
  @Put('profile')
  async updateProfile(@Req() req, @Body() updateProfileDto: UpdateProfileDto) {
    return this.usersService.updateProfile(req.user._id, updateProfileDto);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Get('parent/:parentId/children')
  async getChildrenOfParent(@Param('parentId') parentId: string) {
    return this.usersService.getChildrenOfParent(parentId);
  }
}
