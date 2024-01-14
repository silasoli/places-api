import { ApiProperty } from '@nestjs/swagger';
import { Place } from 'src/database/entities/place.entity';

export class PlaceResponseDto {
  constructor(place: Place) {
    const { id, name, city, state, created_at, updated_at } = place;

    return { id, name, city, state, created_at, updated_at };
  }

  @ApiProperty({ required: true })
  id: number;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  city: string;
  
  @ApiProperty({ required: true })
  state: string;

  @ApiProperty({ required: true })
  created_at: Date;

  @ApiProperty({ required: true })
  updated_at: Date;
}
