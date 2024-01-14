import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../../database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ERRORS } from 'src/utils/constants/errors';
import { ConfigService } from '@nestjs/config';
import { UserResponseDto } from '../dto/user-response.dto';

@Injectable()
export class UsersService {
  private saltOrRounds: number;

  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly configService: ConfigService,
  ) {
    this.saltOrRounds = Number(this.configService.get('SALT_OR_ROUNDS'));
  }

  private async transformDto(dto: CreateUserDto): Promise<void> {
    dto.email = dto.email.toLowerCase();

    dto.password = await bcrypt.hash(dto.password, this.saltOrRounds);
  }

  private async validCreate(dto: CreateUserDto): Promise<void> {
    const user = await this.findByEmail(dto.email);

    if (user) throw ERRORS.USERS.EMAIL_CONFLICT;
  }

  public async findByEmail(email: string): Promise<User> {
    return this.repository.findOne({ where: { email: email.toLowerCase() } });
  }

  public async comparePass(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  public async create(dto: CreateUserDto): Promise<UserResponseDto> {
    await this.validCreate(dto);

    await this.transformDto(dto);

    const user = this.repository.create(dto);

    const created = await this.repository.save(user);

    return new UserResponseDto(created);
  }
}
