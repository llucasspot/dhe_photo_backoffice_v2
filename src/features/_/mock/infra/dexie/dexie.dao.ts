import { EntityTable } from 'dexie';

import { Dao, DtoByTableName, Finder, TableName } from '../../daos';

import { DatabaseServiceDexieAdapter } from './database.service.dexie-adapter';

export class DexieDao<TTableName extends TableName> implements Dao<TTableName> {
  protected query: EntityTable<DtoByTableName[TTableName], 'id'>;

  constructor(
    private readonly databaseService: DatabaseServiceDexieAdapter,
    tableName: TTableName,
  ) {
    this.query = this.databaseService.getRelatedTable(tableName);
  }

  async getAll<TPopulatedEntity extends DtoByTableName[TTableName]>(
    finder?: Finder<TTableName, TPopulatedEntity>,
  ): Promise<DtoByTableName[TTableName][] | TPopulatedEntity[]> {
    return this.databaseService.getAll(this.query, finder);
  }

  async getById(id: string): Promise<DtoByTableName[TTableName] | undefined> {
    return this.databaseService.getById(this.query, id);
  }

  async get<TPopulatedEntity extends DtoByTableName[TTableName]>(
    finder?: Finder<TTableName, TPopulatedEntity>,
  ): Promise<DtoByTableName[TTableName] | TPopulatedEntity | undefined> {
    return this.databaseService.get(this.query, finder);
  }

  async save(
    body: Omit<DtoByTableName[TTableName], 'id'>,
  ): Promise<DtoByTableName[TTableName]> {
    return this.databaseService.save(this.query, body);
  }

  async saveMany(
    entities: Omit<DtoByTableName[TTableName], 'id'>[],
  ): Promise<DtoByTableName[TTableName][]> {
    return this.databaseService.saveMany(this.query, entities);
  }

  async update(
    id: string,
    body: Partial<DtoByTableName[TTableName]>,
  ): Promise<DtoByTableName[TTableName] | undefined> {
    return this.databaseService.update(this.query, id, body);
  }

  async deleteById(id: string): Promise<boolean> {
    return this.databaseService.deleteById(this.query, id);
  }
}
