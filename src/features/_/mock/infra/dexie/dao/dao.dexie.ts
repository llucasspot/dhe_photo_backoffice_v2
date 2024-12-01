import { EntityTable } from 'dexie';

import { DatabaseServiceDexieAdapter } from '../service';

import { DtoByDexieTableName } from './dto-by-table-name.type.dexie';

import { Dao, Finder } from '#mock/domain';

export class DaoDexie<TTableName extends keyof DtoByDexieTableName>
  implements Dao<DtoByDexieTableName, TTableName>
{
  protected query: EntityTable<DtoByDexieTableName[TTableName], 'id'>;

  constructor(
    private readonly databaseService: DatabaseServiceDexieAdapter,
    tableName: TTableName,
  ) {
    this.query = this.databaseService.getRelatedTable(tableName);
  }

  getAll(): Promise<DtoByDexieTableName[TTableName][]>;
  getAll<TPopulatedEntity extends DtoByDexieTableName[TTableName]>(
    finder: Finder<DtoByDexieTableName, TTableName, TPopulatedEntity>,
  ): Promise<TPopulatedEntity[]>;
  getAll<TPopulatedEntity extends DtoByDexieTableName[TTableName]>(
    finder?: Finder<DtoByDexieTableName, TTableName, TPopulatedEntity>,
  ): Promise<DtoByDexieTableName[TTableName][]> | Promise<TPopulatedEntity[]> {
    return this.databaseService.getAll(this.query, finder);
  }

  get(): Promise<DtoByDexieTableName[TTableName] | null>;
  get<TPopulatedEntity extends DtoByDexieTableName[TTableName]>(
    finder: Finder<DtoByDexieTableName, TTableName, TPopulatedEntity>,
  ): Promise<TPopulatedEntity | null | undefined>;
  get<TPopulatedEntity extends DtoByDexieTableName[TTableName]>(
    finder?: Finder<DtoByDexieTableName, TTableName, TPopulatedEntity>,
  ): Promise<
    DtoByDexieTableName[TTableName] | TPopulatedEntity | null | undefined
  > {
    return this.databaseService.get(this.query, finder);
  }

  async getById(
    id: DtoByDexieTableName[TTableName]['id'],
  ): Promise<DtoByDexieTableName[TTableName] | undefined> {
    return this.databaseService.getById(this.query, id);
  }

  async save(
    body: Omit<DtoByDexieTableName[TTableName], 'id'>,
  ): Promise<DtoByDexieTableName[TTableName]> {
    return this.databaseService.save(this.query, body);
  }

  async saveMany(
    entities: Omit<DtoByDexieTableName[TTableName], 'id'>[],
  ): Promise<DtoByDexieTableName[TTableName][]> {
    return this.databaseService.saveMany(this.query, entities);
  }

  async update(
    id: DtoByDexieTableName[TTableName]['id'],
    body: Partial<DtoByDexieTableName[TTableName]>,
  ): Promise<DtoByDexieTableName[TTableName] | undefined> {
    return this.databaseService.update(this.query, id, body);
  }

  async deleteById(id: string): Promise<boolean> {
    return this.databaseService.deleteById(this.query, id);
  }
}
