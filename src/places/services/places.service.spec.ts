import { Test, TestingModule } from '@nestjs/testing';
import { PlacesService } from './places.service';
import { Repository } from 'typeorm';
import { CreatePlaceDto } from '../dto/create-place.dto';
import { Place } from '../../database/entities/place.entity';
import { PlaceResponseDto } from '../dto/place-response.dto';
import { PlaceQueryDto } from '../dto/place-query.dto';
import { UpdatePlaceDto } from '../dto/update-place.dto';
import { faker } from '@faker-js/faker';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ERRORS } from '../../utils/constants/errors';

const placeMock = {
  id: faker.number.int(),
  name: faker.string.alpha(),
  city: faker.string.alpha(),
  state: faker.string.alpha(),
  created_at: faker.date.past(),
  updated_at: faker.date.recent(),
};

describe('PlacesService', () => {
  let service: PlacesService;
  let repository: Repository<Place>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlacesService,
        {
          provide: getRepositoryToken(Place),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PlacesService>(PlacesService);
    repository = module.get<Repository<Place>>(getRepositoryToken(Place));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a new place', async () => {
      const createDto: CreatePlaceDto = {
        name: faker.string.alpha(),
        city: faker.string.alpha(),
        state: faker.string.alpha(),
      };

      jest.spyOn(repository, 'create').mockReturnValueOnce(placeMock);
      jest.spyOn(repository, 'save').mockResolvedValueOnce(placeMock);

      const result = await service.create(createDto);

      expect(result).toEqual(new PlaceResponseDto(placeMock));
    });
  });

  describe('findAll', () => {
    it('should find all places', async () => {
      const queryDto: PlaceQueryDto = {
        name: faker.string.alpha(),
      };

      jest.spyOn(repository, 'find').mockResolvedValueOnce([placeMock]);

      const result = await service.findAll(queryDto);

      expect(result).toEqual([new PlaceResponseDto(placeMock)]);
    });
  });

  describe('findOne', () => {
    it('should find a place by id', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(placeMock);

      const result = await service.findOne(placeMock.id);

      expect(result).toEqual(new PlaceResponseDto(placeMock));
    });

    it('should throw an error if place is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

      await expect(service.findOne(faker.number.int())).rejects.toThrow(
        ERRORS.PLACES.NOT_FOUND,
      );
    });
  });

  describe('update', () => {
    it('should update a place', async () => {
      const updateDto: UpdatePlaceDto = {
        name: faker.string.alpha(),
        city: faker.string.alpha(),
        state: faker.string.alpha(),
      };

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(placeMock);
      jest.spyOn(repository, 'save').mockResolvedValueOnce(placeMock);

      const result = await service.update(placeMock.id, updateDto);

      expect(result).toEqual(new PlaceResponseDto(placeMock));
    });

    it('should throw an error if place is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

      await expect(
        service.update(faker.number.int(), {} as UpdatePlaceDto),
      ).rejects.toThrow(ERRORS.PLACES.NOT_FOUND);
    });
  });

  describe('remove', () => {
    it('should remove a place', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(placeMock);
      jest.spyOn(repository, 'delete').mockResolvedValueOnce({} as any);

      await service.remove(placeMock.id);

      expect(repository.delete).toHaveBeenCalledWith({ id: placeMock.id });
    });

    it('should throw an error if place is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

      await expect(service.remove(faker.number.int())).rejects.toThrow(
        ERRORS.PLACES.NOT_FOUND,
      );
    });
  });
});
