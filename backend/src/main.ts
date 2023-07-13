import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar el middleware de CORS para permitir todas las solicitudes
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
