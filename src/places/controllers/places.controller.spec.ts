import { Test, TestingModule } from '@nestjs/testing';
import { PlacesController } from './places.controller';
import { PlacesService } from '../services/places.service';
import { CreatePlaceDto } from '../dto/create-place.dto';
import { UpdatePlaceDto } from '../dto/update-place.dto';
import { IDQueryDTO } from '../dto/id-query.dto';
import { PlaceResponseDto } from '../dto/place-response.dto';
import { PlaceQueryDto } from '../dto/place-query.dto';
import { faker } from '@faker-js/faker';

const placeMock = {
  id: faker.number.int(),
  name: faker.string.alpha(),
  city: faker.string.alpha(),
  state: faker.string.alpha(),
  password: faker.internet.password(),
  created_at: faker.date.past(),
  updated_at: faker.date.recent(),
};

describe('PlacesController', () => {
  let controller: PlacesController;
  let placesService: PlacesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlacesController],
      providers: [
        {
          provide: PlacesService,
          useValue: {
            create: jest
              .fn()
              .mockResolvedValueOnce(new PlaceResponseDto(placeMock)),
            findAll: jest
              .fn()
              .mockResolvedValueOnce([new PlaceResponseDto(placeMock)]),
            findOne: jest
              .fn()
              .mockResolvedValueOnce(new PlaceResponseDto(placeMock)),
            update: jest
              .fn()
              .mockResolvedValueOnce(new PlaceResponseDto(placeMock)),
            remove: jest.fn().mockResolvedValueOnce(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<PlacesController>(PlacesController);
    placesService = module.get<PlacesService>(PlacesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new place and return the place response', async () => {
      const createDto: CreatePlaceDto = {
        name: faker.string.alpha(),
        city: faker.string.alpha(),
        state: faker.string.alpha(),
      };

      const result = await controller.create(createDto);

      expect(result).toEqual(new PlaceResponseDto(placeMock));
      expect(placesService.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('should find all places and return the array of place responses', async () => {
      const queryDto: PlaceQueryDto = {
        name: faker.string.alpha(),
      };

      const result = await controller.findAll(queryDto);

      expect(result).toEqual([new PlaceResponseDto(placeMock)]);
      expect(placesService.findAll).toHaveBeenCalledWith(queryDto);
    });
  });

  describe('findOne', () => {
    it('should find a place by id and return the place response', async () => {
      const idQueryDto: IDQueryDTO = {
        id: faker.number.int(),
      };

      const result = await controller.findOne(idQueryDto);

      expect(result).toEqual(new PlaceResponseDto(placeMock));
      expect(placesService.findOne).toHaveBeenCalledWith(idQueryDto.id);
    });
  });

  describe('update', () => {
    it('should update a place and return the updated place response', async () => {
      const idQueryDto: IDQueryDTO = {
        id: faker.number.int(),
      };

      const updateDto: UpdatePlaceDto = {
        name: faker.string.alpha(),
        city: faker.string.alpha(),
        state: faker.string.alpha(),
      };

      const result = await controller.update(idQueryDto, updateDto);

      expect(result).toEqual(new PlaceResponseDto(placeMock));
      expect(placesService.update).toHaveBeenCalledWith(
        idQueryDto.id,
        updateDto,
      );
    });
  });

  describe('remove', () => {
    it('should remove a place by id', async () => {
      const idQueryDto: IDQueryDTO = {
        id: faker.number.int(),
      };

      await controller.remove(idQueryDto);

      expect(placesService.remove).toHaveBeenCalledWith(idQueryDto.id);
    });
  });
});
