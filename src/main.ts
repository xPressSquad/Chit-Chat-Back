import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  // Enable CORS
  app.enableCors({
    origin: '*', // Allow all origins (for testing purposes)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow only GET, POST, PUT, DELETE requests
  });
  
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();