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

  const port = parseInt(process.env.PORT || '3001', 10);
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Server running on http://0.0.0.0:${port}`);
}
bootstrap();
