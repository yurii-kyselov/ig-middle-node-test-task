import { ConfigType } from 'config';
import { DeepNullable } from 'ts-essentials';

const config: DeepNullable<ConfigType> = {
  port: 3000,
  sessionSecret: 'someVerySecretValue',
  typeorm: {
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    database: 'organization-aw',
    port: 5433,
    logging: true,
    synchronize: false,
    migrationsRun: true,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: ['./dist/src/migrations/*{.ts,.js}'],
  },
};
export default config;
