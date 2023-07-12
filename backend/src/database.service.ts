// database.service.ts
import { Injectable } from '@nestjs/common';
import { createConnection, Connection } from 'mysql';

@Injectable()
export class DatabaseService {
  private connection: Connection;

  constructor() {
    this.connection = createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'database_name',
    });

    this.connection.connect();
  }

  async query(sql: string, params?: any[]): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, params, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
}
