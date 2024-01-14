import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';
import { UserResponseDto } from '../dto/user-response.dto';
import { faker } from '@faker-js/faker';
import { CreateUserDto } from '../dto/create-user.dto';

const userMock = {
  id: faker.number.int(),
  email: faker.internet.email(),
  created_at: faker.date.past(),
  updated_at: faker.date.recent(),
};

const password = faker.internet.password();

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockImplementation((dto: CreateUserDto) => {
              return { ...userMock, email: dto.email };
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user and return the user response', async () => {
      const newEmail = faker.internet.email();

      const result = await controller.create({
        email: newEmail,
        password,
      });

      expect(result).toEqual(
        new UserResponseDto({ ...userMock, password, email: newEmail }),
      );
    });
  });
});
