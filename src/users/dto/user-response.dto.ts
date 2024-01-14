import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/database/entities/user.entity';

export class UserResponseDto {
  constructor(user: User) {
    const { id, email, created_at, updated_at } = user;

    return { id, email, created_at, updated_at };
  }

  @ApiProperty({ required: true })
  id: number;

  @ApiProperty({ required: true })
  email: string;

  
  @ApiProperty({ required: true })
  created_at: Date;

  @ApiProperty({ required: true })
  updated_at: Date;
}
