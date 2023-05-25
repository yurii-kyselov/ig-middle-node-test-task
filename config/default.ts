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
    database: 'shop-aw',
    port: 5433,
    logging: false,
    synchronize: false,
    migrationsRun: true,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: ['./dist/migrations/*{.ts,.js}'],
  },
};
export default config;
