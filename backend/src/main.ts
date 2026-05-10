import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Mengaktifkan validasi global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Otomatis membuang properti asing yang tidak ada di DTO
  }));

  // Mengaktifkan CORS untuk port 3000
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 30015);
}
bootstrap();