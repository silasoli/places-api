import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/database/entities/user.entity';

export class UserResponseDto {
  constructor(user: User) {
    const { id, email } = user;

    return { id, email };
  }

  @ApiProperty({ required: true })
  id: number;

  @ApiProperty({ required: true })
  email: string;
}
