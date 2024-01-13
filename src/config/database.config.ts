import { registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

export default registerAs('database', () => {
  const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_DATABASE } = process.env;

  return {
    type: 'postgres',
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PASS,
    database: DB_DATABASE,
    autoLoadEntities: true,
    entities: [__dirname + '/../**/database/entities/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../**/database/migrations/*{.ts,.js}'],
    synchronize: false,
    migrationsRun: false,
    cli: {
      migrationsDir: 'src/database/migrations',
    },
  } as DataSourceOptions;
});
