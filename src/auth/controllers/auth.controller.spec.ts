import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { UserLoginDto } from '../dto/user-login.dto';
import { UserLoginResponseDto } from '../dto/user-login-response.dto';
import { ERRORS } from '../../utils/constants/errors';

const mockAuthService = {
  authenticateUser: jest.fn(),
  decodeAccessToken: jest.fn(),
};

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return UserLoginResponseDto on successful login', async () => {
      const userLoginDto: UserLoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const mockUserLoginResponse: UserLoginResponseDto = {
        id: 1,
        email: 'test@example.com',
        access_token: 'mockedAccessToken',
      };

      mockAuthService.authenticateUser.mockResolvedValueOnce(
        mockUserLoginResponse,
      );

      const result = await controller.login(userLoginDto);

      expect(mockAuthService.authenticateUser).toHaveBeenCalledWith(
        userLoginDto,
      );
      expect(result).toEqual(mockUserLoginResponse);
    });

    it('should throw an error on unsuccessful login', async () => {
      const userLoginDto: UserLoginDto = {
        email: 'nonexistent@example.com',
        password: 'wrongPassword',
      };

      mockAuthService.authenticateUser.mockRejectedValueOnce(
        ERRORS.AUTH.INVALID_CREDENTIALS,
      );

      await expect(controller.login(userLoginDto)).rejects.toThrow(
        ERRORS.AUTH.INVALID_CREDENTIALS,
      );

      expect(mockAuthService.authenticateUser).toHaveBeenCalledWith(
        userLoginDto,
      );
    });
  });
});
