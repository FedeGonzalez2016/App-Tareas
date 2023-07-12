import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TareasController } from './tareas.controller';
import { DatabaseService } from './database.service';

@Module({
  imports: [],
  controllers: [AppController, TareasController],
  providers: [AppService, DatabaseService], // Agrega DatabaseService aquí
})
export class AppModule {}
