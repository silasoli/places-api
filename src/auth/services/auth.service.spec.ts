import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from '../dto/user-login.dto';
import { ERRORS } from '../../utils/constants/errors';

const mockUsersService = {
  findByEmail: jest.fn(),
  comparePass: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
  verifyAsync: jest.fn(),
};

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('authenticateUser', () => {
    it('should authenticate a user and return UserLoginResponseDto', async () => {
      const userLoginDto: UserLoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
      };

      mockUsersService.findByEmail.mockResolvedValueOnce(mockUser);
      mockUsersService.comparePass.mockResolvedValueOnce(true);
      mockJwtService.sign.mockReturnValueOnce('mockedAccessToken');

      const result = await authService.authenticateUser(userLoginDto);

      expect(mockUsersService.findByEmail).toHaveBeenCalledWith(
        userLoginDto.email,
      );
      expect(mockUsersService.comparePass).toHaveBeenCalledWith(
        userLoginDto.password,
        mockUser.password,
      );
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        email: mockUser.email,
        sub: mockUser.id,
      });

      expect(result).toEqual({
        id: mockUser.id,
        email: mockUser.email,
        access_token: 'mockedAccessToken',
      });
    });

    it('should return null for incorrect password', async () => {
      const userLoginDto: UserLoginDto = {
        email: 'test@example.com',
        password: 'incorrectPassword',
      };

      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
      };

      mockUsersService.findByEmail.mockResolvedValueOnce(mockUser);
      mockUsersService.comparePass.mockResolvedValueOnce(false);

      const result = await authService['validateUser'](userLoginDto);

      expect(mockUsersService.findByEmail).toHaveBeenCalledWith(
        userLoginDto.email,
      );
      expect(mockUsersService.comparePass).toHaveBeenCalledWith(
        userLoginDto.password,
        mockUser.password,
      );
      expect(result).toBeNull();
    });

    it('should throw an error for invalid credentials', async () => {
      const userLoginDto: UserLoginDto = {
        email: 'nonexistent@example.com',
        password: 'wrongPassword',
      };

      mockUsersService.findByEmail.mockResolvedValueOnce(null);
      mockUsersService.comparePass.mockResolvedValueOnce(false);

      await expect(authService.authenticateUser(userLoginDto)).rejects.toThrow(
        ERRORS.AUTH.INVALID_CREDENTIALS,
      );

      expect(mockUsersService.findByEmail).toHaveBeenCalledWith(
        userLoginDto.email,
      );
    });
  });

  describe('decodeAccessToken', () => {
    it('should decode an access token', async () => {
      const mockToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpbGFzQGdtYWlsLmNvbSIsInN1YiI6MSwiaWF0IjoxNzA1MjU2NjQ1LCJleHAiOjE3MDUzNDMwNDV9.zl88itTTy7PGsa0ZXC3NpfhB2f75TRiZTFrCqOYeGMM';

      const mockTokenPayload = { sub: 1, email: 'silas@gmail.com' };

      mockJwtService.verifyAsync.mockResolvedValueOnce(mockTokenPayload);

      const result = await authService.decodeAccessToken(mockToken);

      expect(mockJwtService.verifyAsync).toHaveBeenCalledWith(mockToken);
      expect(result).toEqual(mockTokenPayload);
    });
  });
});
