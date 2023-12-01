import { DataSource } from 'typeorm';

export interface IDatabaseService {
  connect(): Promise<DataSource>;
  get dataSource(): DataSource;
}
