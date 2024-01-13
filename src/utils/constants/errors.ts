import { ConflictException, ForbiddenException } from '@nestjs/common';

export const ERRORS = {
  USERS: {
    EMAIL_CONFLICT: new ConflictException({
      id: 'USERS-001',
      message: 'Email already used',
    }),
  },
  AUTH: {
    INVALID_CREDENTIALS: new ForbiddenException({
      id: 'AUTH-001',
      message: 'Invalid credentials',
    })
  }
};
