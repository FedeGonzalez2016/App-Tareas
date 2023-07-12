import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';


// DECORADOR QUE DECLARA UN MODULO
@Module({
  imports: [TasksModule], // AÑADIR FUNCIONALIDADES EXTRAS, COMO POR EJEMPLO UNA BASE DE DATOS.
  controllers: [], // CONTROLADORES Y RUTAS QUE PUEDE TENER ESTE MODULO (RUTAS GET, POST, DELETE)
  providers: [], // FUNCIONES QUE PUEDEN SER REUTILIZADAS Y CONECTARSE A LA BASE DE DATOS
})
export class AppModule {}
