// src/users/dto/update-profile.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail, IsEnum } from 'class-validator';
import { UserRole } from 'src/schemas/user.schema';

export class UpdateProfileDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  fullName?: string;

  // @ApiProperty()
  // @IsOptional()
  // @IsString()
  // avatar?: string;

  // @ApiProperty()
  // @IsOptional()
  // @IsString()
  // address?: string;

  // Add other fields (e.g. phone, avatar) as needed
}

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ enum: UserRole })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
