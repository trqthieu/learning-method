import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  message?: string;

  @ApiProperty({ description: 'User ID nhận thông báo' })
  user: string;
}
