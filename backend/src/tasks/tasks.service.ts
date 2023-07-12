import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';

@Injectable()
export class TasksService {

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
        return 
    }

  // Resto de los métodos



    //getTaskById() {}
    createTask() {}
    updateTask() {}
    deleteTask() {}
}
