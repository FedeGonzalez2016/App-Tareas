//task.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {

    constructor (private tasksService : TasksService) {}

    @Get()
    getAllTasks() {
        return this.tasksService.getAllTasks();
    }

    @Post()
    createTask(@Body() newTask: any ) {
        console.log(newTask)
        return "Guardando";
       // this.tasksService.createTask()
    }

}
