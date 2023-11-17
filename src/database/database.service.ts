import './typeorm/polyfill';

import { DataSource } from 'typeorm';

import { IDatabaseService } from './interface';
import { AppDataSource } from './typeorm/data-source';

export class DatabaseService implements IDatabaseService {
  private _dataSource: DataSource;

  constructor() {
    this._dataSource = AppDataSource;
  }

  get dataSource() {
    return this._dataSource;
  }

  connect(): Promise<DataSource> {
    return this._dataSource.initialize();
  }
}
