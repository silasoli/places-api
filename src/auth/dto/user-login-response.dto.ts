import { ApiProperty } from '@nestjs/swagger';
import { ILoginPayload } from '../interfaces/IPayload.interface';

export class UserLoginResponseDto {
  constructor(user: ILoginPayload) {
    const { id, email, access_token } = user;

    return { id, email, access_token };
  }

  @ApiProperty({ required: true })
  id: number;

  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: true })
  access_token: string;
}