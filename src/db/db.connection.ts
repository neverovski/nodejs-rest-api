import './typeorm/polyfill';

import { DataSource } from 'typeorm';

import { AppDataSource } from './typeorm/data-source';
export default class DBConnection {
  readonly dataSource: DataSource;

  constructor() {
    this.dataSource = AppDataSource;
  }

  connect(): Promise<DataSource> {
    return this.dataSource.initialize();
  }
}
