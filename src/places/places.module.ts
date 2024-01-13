import { Module } from '@nestjs/common';
import { PlacesService } from './services/places.service';
import { PlacesController } from './controllers/places.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from 'src/database/entities/place.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Place])],
  controllers: [PlacesController],
  providers: [PlacesService],
})
export class PlacesModule {}
