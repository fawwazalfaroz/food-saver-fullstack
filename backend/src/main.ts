import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global prefix: all routes become /api/...
  app.setGlobalPrefix('api');

  // Mengaktifkan validasi global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));

  // CORS configuration for production and local
  app.enableCors({
    origin: ['https://food-saver-v1.netlify.app', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001, '0.0.0.0');
}
bootstrap();
