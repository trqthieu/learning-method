// src/parents/parents.service.ts
import {
    BadRequestException,
    Injectable,
  } from '@nestjs/common';
  import * as bcrypt from 'bcrypt';
  import { UsersService } from 'src/users/users.service';
import { CreateChildDto } from './dto/create-child.dto';
  
  @Injectable()
  export class ParentsService {
    constructor(private readonly usersService: UsersService) {}
  
    async createChild(parentUser: any, createChildDto: CreateChildDto) {
      const existing = await this.usersService.findByEmail(createChildDto.email);
      if (existing) {
        throw new BadRequestException('Child account with this email already exists');
      }
  
      const passwordHash = await bcrypt.hash(createChildDto.password, 10);
  
      const childUser = await this.usersService.create({
        fullName: createChildDto.fullName,
        email: createChildDto.email,
        passwordHash,
        parentId: parentUser._id,
        role: 'child',
      });
  
      return { message: 'Child account created successfully', child: childUser };
    }
  }
  