import { ConflictException } from '@nestjs/common';

export const ERRORS = {
  USER: {
    EMAIL_CONFLICT: new ConflictException({
      id: 'USERS-001',
      message: 'Email already used',
    }),
  },
};
