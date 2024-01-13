import { ConfigModule } from '@nestjs/config';
import databaseConfig from '../config/database.config';
import { DataSource } from 'typeorm';

ConfigModule.forRoot({
  isGlobal: true,
  load: [databaseConfig],
});

export default new DataSource(databaseConfig());
