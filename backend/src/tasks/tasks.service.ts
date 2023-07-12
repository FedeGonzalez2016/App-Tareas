//task.service.ts
import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import {v4} from 'uuid';

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
        return this.tasks;
    }

  // Resto de los métodos

    //getTaskById() {}
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
    updateTask() {}
    deleteTask() {}
}
