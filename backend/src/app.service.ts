import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Injectable()
export class AppService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getHello(): Promise<string> {
    const tareas = await this.databaseService.query('SELECT * FROM tareas');
    return JSON.stringify(tareas);
  }
}
