import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

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
  },
  PLACES: {
    NOT_FOUND: new NotFoundException({
      id: 'PLACES-001',
      message: 'Place not found',
    }) 
  }
};
