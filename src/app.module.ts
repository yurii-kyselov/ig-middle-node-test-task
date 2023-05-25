import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { JoiPipeModule } from 'nestjs-joi';
import config from 'config';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRootAsync({
      useFactory: (): DataSourceOptions => config.typeorm,
      dataSourceFactory: async (dataSourceConfig) =>
        await new DataSource(dataSourceConfig).initialize(),
    }),
    JoiPipeModule.forRoot(),
  ],
})
export class AppModule {}
