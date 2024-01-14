import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from '../../database/entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcryptjs';
import { UserResponseDto } from '../dto/user-response.dto';
import { ERRORS } from '../../utils/constants/errors';

const userMock = {
  id: faker.number.int(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  created_at: faker.date.past(),
  updated_at: faker.date.recent(),
};

describe('Users Service', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation((param: string) => {
              return `mock_get_${param}`;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('findByEmail', () => {
    it('should find a user by email', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(userMock);

      const result = await service.findByEmail(userMock.email);

      expect(result).toEqual(userMock);
    });

    it('should return null if user is not found', async () => {
      const userEmail = 'nonexistent@example.com';

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

      const result = await service.findByEmail(userEmail);

      expect(result).toBeNull();
    });
  });

  describe('comparePass', () => {
    it('should return true if passwords match', async () => {
      const hashedPassword = await bcrypt.hash(userMock.password, 10);

      const result = await service.comparePass(
        userMock.password,
        hashedPassword,
      );

      expect(result).toBe(true);
    });

    it('should return false if passwords do not match', async () => {
      const incorrectPassword = faker.internet.password();
      const hashedPassword = await bcrypt.hash(userMock.password, 10);

      const result = await service.comparePass(
        incorrectPassword,
        hashedPassword,
      );

      expect(result).toBe(false);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);
      jest
        .spyOn(repository, 'create')
        .mockReturnValueOnce({ id: 1, ...userMock });
      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce({ id: 1, ...userMock });

      const result = await service.create({
        email: userMock.email,
        password: userMock.password,
      });

      expect(result).toEqual(new UserResponseDto(userMock));
    });

    it('should throw an error if email is already in use', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValueOnce({ id: 1, ...userMock });

      await expect(
        service.create({
          email: userMock.email,
          password: userMock.password,
        }),
      ).rejects.toThrow(ERRORS.USERS.EMAIL_CONFLICT);
    });
  });
});
