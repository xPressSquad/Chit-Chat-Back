import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  // Enable CORS
  app.enableCors({
    origin: '*', // Allow all origins (for testing purposes)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow only GET, POST, PUT, DELETE requests
    allowedHeaders: ['Content-Type'],
  });      
    // Enable global validation
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true, // Strip properties that do not have decorators
      forbidNonWhitelisted: true, // Throw an error if there are non-whitelisted properties
      transform: true, // Automatically transform payloads to DTO instances
    }));

  
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
