import { DataSourceOptions } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

type ConfigType = {
  port: number;
  sessionSecret: string;
  typeorm: DataSourceOptions & PostgresConnectionOptions;
};

declare module 'config' {
  declare const config: ConfigType;

  export default config;
}
