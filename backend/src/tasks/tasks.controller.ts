import { Body, Controller, Get, Param, Post, Delete, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return await this.tasksService.getAllTasks();
  }

  @Post()
  async createTask(@Body() newTask: CreateTaskDto): Promise<Task> {
    return await this.tasksService.createTask(newTask.title, newTask.description);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<string> {
    await this.tasksService.deleteTask(id);
    return 'Task deleted successfully';
  }

  @Patch(':id')
  async updateTask(@Param('id') id: string, @Body() updatedFields: UpdateTaskDto): Promise<Task> {
    return await this.tasksService.updateTask(id, updatedFields);
  }
}
