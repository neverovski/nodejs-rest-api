import './typeorm/polyfill';

import { DataSource } from 'typeorm';

import { AppDataSource } from './typeorm/data-source';

class DbConnection {
  readonly dataSource: DataSource;

  constructor() {
    this.dataSource = AppDataSource;
  }

  connect(): Promise<DataSource> {
    return this.dataSource.initialize();
  }
}

export default new DbConnection();
