// src/parents/parents.controller.ts
import {
    Controller,
    Post,
    Body,
    Req,
    UseGuards,
  } from '@nestjs/common';
  import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

  import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { ParentsService } from './parents.service';
import { CreateChildDto } from './dto/create-child.dto';
  
  @ApiTags('Parents')
  @Controller('parents')
  export class ParentsController {
    constructor(private readonly parentsService: ParentsService) {}
  
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Roles('parent')
    @Post('create-child')
    async createChild(@Req() req, @Body() createChildDto: CreateChildDto) {
      return this.parentsService.createChild(req.user, createChildDto);
    }
  }
  