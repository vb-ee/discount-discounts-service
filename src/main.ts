import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { verifyToken } from './middlewares';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets('images', {
    prefix: '/discount-images',
  });
  app.use(verifyToken());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8080);
}
bootstrap();
