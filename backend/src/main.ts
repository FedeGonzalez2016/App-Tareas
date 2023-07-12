//main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


// ARCHIVO PRINCIPAL EL CUAL EJECUTA LOS DEMAS MODULOS
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
