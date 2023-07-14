import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Task } from './task.entity';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async createTask(title: string, description: string): Promise<Task> {
    const task = this.taskRepository.create({
      id: uuidv4(),
      title,
      description,
    });

    return this.taskRepository.save(task);
  }

  async deleteTask(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }

  async getTaskById(id: string): Promise<Task | null> {
    const options: FindOneOptions<Task> = {
      where: { id },
    };

    return this.taskRepository.findOne(options);
  }

  async updateTask(id: string, updatedFields: UpdateTaskDto): Promise<Task> {
    await this.taskRepository.update(id, updatedFields);

    return this.getTaskById(id);
  }
}
