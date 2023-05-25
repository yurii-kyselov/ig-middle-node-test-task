import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from 'config';
import { ValidationPipe } from '@nestjs/common';
import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('/api');

  app.use(
    session({
      secret: config.sessionSecret,
      resave: false,
      saveUninitialized: false,
    }),
  );

  await app.listen(config.port);
}
bootstrap();
