import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class IDQueryDTO {
  @ApiProperty({ required: true, description: 'Send a valid ID' })
  @IsNotEmpty({ message: 'ID cannot be empty.' })
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt({ message: 'ID must be an integer.' }) 
  @Type(() => Number)
  id: number;
}
