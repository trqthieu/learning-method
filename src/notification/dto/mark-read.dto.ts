import { ApiProperty } from '@nestjs/swagger';

export class MarkReadDto {
  @ApiProperty({ description: 'Đánh dấu là đã đọc (true)' })
  read: boolean;
}
