import { Injectable } from '@nestjs/common';
import { CreatePlaceDto } from '../dto/create-place.dto';
import { UpdatePlaceDto } from '../dto/update-place.dto';
import { Place } from 'src/database/entities/place.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { ERRORS } from 'src/utils/constants/errors';
import { PlaceResponseDto } from '../dto/place-response.dto';
import { PlaceQueryDto } from '../dto/place-query.dto';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place)
    private readonly repository: Repository<Place>,
  ) {}

  public async create(dto: CreatePlaceDto): Promise<PlaceResponseDto> {
    const place = this.repository.create(dto);

    const created = await this.repository.save(place);

    return new PlaceResponseDto(created);
  }

  public async findAll(query: PlaceQueryDto): Promise<Place[]> {
    const where: FindOptionsWhere<Place> = {};

    if (query.name) where.name = ILike(`%${query.name}%`);

    const places = await this.repository.find({ where });

    return places.map((video) => new PlaceResponseDto(video));
  }

  public async findOne(id: number): Promise<Place> {
    const place = await this.repository.findOne({
      where: { id },
    });

    if (!place) throw ERRORS.PLACES.NOT_FOUND;

    return place;
  }

  public async update(
    id: number,
    dto: UpdatePlaceDto,
  ): Promise<PlaceResponseDto> {
    const place = await this.findOne(id);

    const updated = await this.repository.save({ ...place, ...dto });

    return new PlaceResponseDto(updated);
  }

  public async remove(id: number): Promise<void> {
    await this.findOne(id);

    await this.repository.delete({ id });
  }
}
