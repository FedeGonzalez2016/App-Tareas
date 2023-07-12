//task.service.ts
import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import {v4} from 'uuid';
import { UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {

  // Simula una base de datos  
  private tasks: Task[] = 
  [
    {
      id: '1',
      title: 'Primer Tarea',
      description: 'Descripcion de primer tarea',
      status:TaskStatus.PENDING,
    },
  ];  

    getAllTasks() {
        return this.tasks;
    }

     // Resto de los métodos

    
    createTask(title: string, description: string) {
       const task = {
        id: v4(),
        title,
        description,
        status: TaskStatus.PENDING
       }
        this.tasks.push(task);

        return task
    }
    
    deleteTask(id : string) {
        // MIENTRAS LA TAREA SEA DIFERENTE A LA QUE LE PASO POR PARAMETRO, QUE ME LA GUARDE EN "tasks"
        this.tasks = this.tasks.filter(task => task.id !== id)
    }

    getTaskById(id : string) {

        // DEVUELVEME UNA TAREA EN LA QUE COINCIDA EL ID INDICADO
        return this.tasks.find (task => task.id === id)
    }

    updateTask(id : string, updatedFields: UpdateTaskDto): Task {
        // BUSCAMOS TAREA POR ID
        const task = this.getTaskById(id)
        //( COMBINAMOS )UTILIZAMOS UNA PROPIEDAD DE OBJETOS DE JAVASCRIPT LLAMADA "assign" PARA UNIR LO QUE TENIAMOS ANTES MAS LO QUE LE ESTAMOS PASANDO POR PARAMETROS, Y EN CASO QUE SE REPITAN LOS CAMPOS SE SOBREESCRIBEN.
        const newTask = Object.assign(task, updatedFields)
        // RECORREMOS Y ACTUALIZAMOS
        this.tasks = this.tasks.map(task => task.id === id ? newTask : task)

        return newTask;
    }

}
