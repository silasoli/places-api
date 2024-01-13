import { Injectable } from '@nestjs/common';
import { CreatePlaceDto } from '../dto/create-place.dto';
import { UpdatePlaceDto } from '../dto/update-place.dto';
import { Place } from 'src/database/entities/place.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place)
    private readonly repository: Repository<Place>,
  ) {}

  private async transformDto(
    dto: CreatePlaceDto | UpdatePlaceDto,
  ): Promise<void> {
    dto.name = dto.name.toLowerCase();
  }

  public async create(dto: CreatePlaceDto): Promise<Place> {
    await this.transformDto(dto);

    const place = this.repository.create(dto);

    return this.repository.save(place);
  }

  public async findAll(): Promise<Place[]> {
    return this.repository.find();
  }

  public async findOne(id: number): Promise<Place> {
    return this.repository.findOneOrFail({
      where: { id },
    });
  }

  public async update(id: number, dto: UpdatePlaceDto): Promise<Place> {
    const place = await this.repository.findOneOrFail({ where: { id } });

    await this.transformDto(dto);

    return this.repository.save({ ...place, ...dto });
  }

  public async remove(id: number): Promise<void> {
    await this.findOne(id);

    await this.repository.delete({ id });
  }
}
