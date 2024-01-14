import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PlaceQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  name?: string;
}
