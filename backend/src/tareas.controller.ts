//tareas.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { Tarea } from './tarea.interface';
import { DatabaseService } from './database.service';

@Controller('tareas')
export class TareasController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get()
  async obtenerTodasLasTareas(): Promise<Tarea[]> {
    const tareas = await this.databaseService.query('SELECT * FROM tareas');
    return tareas;
  }

  @Get(':id')
  async obtenerTareaPorId(@Param('id') id: number): Promise<Tarea> {
    const tarea = await this.databaseService.query('SELECT * FROM tareas WHERE id = ?', [id]);
    return tarea[0];
  }

  // @Post()
  //async crearTarea(@Body() tarea: Tarea): Promise<Tarea> {
   // const result = await this.databaseService.query('INSERT INTO tareas (titulo, descripcion) VALUES (?, ?)', [
   //   tarea.titulo,
   //   tarea.descripcion,
   // ]);
   // tarea.id = result.insertId;
   // return tarea;
  //}

  @Put(':id')
  async actualizarTarea(@Param('id') id: number, @Body() tarea: Tarea): Promise<Tarea> {
    await this.databaseService.query('UPDATE tareas SET titulo = ?, descripcion = ? WHERE id = ?', [
      tarea.titulo,
      tarea.descripcion,
      id,
    ]);
    tarea.id = id;
    return tarea;
  }

  @Delete(':id')
  async eliminarTarea(@Param('id') id: number): Promise<void> {
    await this.databaseService.query('DELETE FROM tareas WHERE id = ?', [id]);
  }
}
