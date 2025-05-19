import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChildDto {
  @ApiProperty({
    description: "Child's full name",
    example: 'Alice Nguyen',
  })
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    description: "Child's email address",
    example: 'alice.child@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Child's password (min 6 characters)",
    example: 'securePass123',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
