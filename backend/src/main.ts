import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Mengaktifkan validasi global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Otomatis membuang properti asing yang tidak ada di DTO
  }));

  // Mengaktifkan CORS untuk frontend
  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:3000',
        'https://food-saver-v1.netlify.app',
      ];
      
      if (!origin) return callback(null, true);
      
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith('.netlify.app')
      ) {
        return callback(null, true);
      }
      
      return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 30015);
}
bootstrap();