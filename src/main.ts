import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from 'config';
import { ValidationPipe } from '@nestjs/common';
import session from 'express-session';
import { ResponseTransformInterceptor } from './common/middlewares/interceptors/response-transform.interceptor';
import { ExceptionTransformFilter } from './common/middlewares/filters/exception-transform.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.useGlobalFilters(new ExceptionTransformFilter());

  app.use(
    session({
      secret: config.sessionSecret,
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 3600000 },
    }),
  );

  await app.listen(config.port);
}
bootstrap();
