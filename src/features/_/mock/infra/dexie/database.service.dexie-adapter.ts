import Dexie, { Collection, EntityTable, IDType, InsertType } from 'dexie';
import { v4 as uuidv4 } from 'uuid';

import {
  DtoByTableName,
  Filter,
  Finder,
  Populator,
  TableName,
} from '../../daos';
import { DatabaseServicePort } from '../../database';

import { operatorMapperDexie } from './operator-mapper.dexie';

import { singleton } from '#di';

export type DexieConnexion = Dexie & {
  [K in TableName]: EntityTable<DtoByTableName[K], 'id'>;
};

@singleton()
export class DatabaseServiceDexieAdapter
  implements DatabaseServicePort<DexieConnexion>
{
  private db: DexieConnexion;

  constructor() {
    const db: DexieConnexion = new Dexie('MyDatabase') as DexieConnexion;

    db.version(1).stores({
      files: 'id, file',
      studentPictures: 'id, fileId, studentId',
      groupPictures: 'id, fileId, klassId',
      klasses: 'id, projectId, name',
      products: 'id, name, description, longSize, shortSize',
      projects:
        'id, schoolId, name, orderEndDate, shotDate, messageForClients, state',
      schools: 'id, name, currency, city',
      students: 'id, klassId, code',
    } as const satisfies {
      [K in TableName]: string;
    });
    db.tables.forEach((table) => {
      table.hook('creating', (_primaryKey, obj) => {
        if (!obj.id) {
          obj.id = uuidv4();
        }
      });
    });
    this.db = db;
  }

  getConnexion() {
    return this.db;
  }

  async getAll<
    TTableName extends TableName,
    TPopulatedEntity extends DtoByTableName[TTableName],
  >(
    query: Pick<
      EntityTable<DtoByTableName[TTableName], 'id'>,
      'filter' | 'toArray'
    >,
    finder?: Finder<TTableName, TPopulatedEntity>,
  ): Promise<DtoByTableName[TTableName][] | TPopulatedEntity[]> {
    const _query = this.rebuildWithFilters(query, finder?.filters);
    const results = await _query.toArray();
    await this.applyPopulators(results, finder?.populators);
    return results;
  }

  async getById<TTableName extends TableName>(
    query: EntityTable<DtoByTableName[TTableName], 'id'>,
    id: string,
  ): Promise<DtoByTableName[TTableName] | undefined> {
    return query.get({ id });
  }

  async get<
    TTableName extends TableName,
    TPopulatedEntity extends DtoByTableName[TTableName],
  >(
    query: Pick<
      EntityTable<DtoByTableName[TTableName], 'id'>,
      'filter' | 'toArray'
    >,
    finder?: Finder<TTableName, TPopulatedEntity>,
  ): Promise<DtoByTableName[TTableName] | TPopulatedEntity | undefined> {
    const _query = this.rebuildWithFilters(query, finder?.filters);
    const result = await _query.first();
    if (!result) {
      return result;
    }
    await this.applyPopulatorsForGet(result, finder?.populators);
    return result;
  }

  async save<TTableName extends TableName>(
    query: EntityTable<DtoByTableName[TTableName], 'id'>,
    body: Omit<DtoByTableName[TTableName], 'id'>,
  ): Promise<DtoByTableName[TTableName]> {
    const id = await query
      // @ts-expect-error save
      .add(body);
    const entity = await this.getById(query, id);
    return entity!;
  }

  async saveMany<TTableName extends TableName>(
    query: EntityTable<DtoByTableName[TTableName], 'id'>,
    entities: Omit<DtoByTableName[TTableName], 'id'>[],
  ): Promise<DtoByTableName[TTableName][]> {
    const res: DtoByTableName[TTableName][] = [];
    for (const entity of entities) {
      const newEntity = await this.save(query, entity);
      res.push(newEntity);
    }
    return res;
  }

  async update<TTableName extends TableName>(
    query: EntityTable<DtoByTableName[TTableName], 'id'>,
    id: string,
    body: Partial<DtoByTableName[TTableName]>,
  ): Promise<DtoByTableName[TTableName] | undefined> {
    const updated = await query.update(
      // @ts-expect-error update with id
      id,
      body,
    );
    if (!updated) {
      return undefined;
    }
    const entity = await this.getById(query, id);
    return entity!;
  }

  async deleteById<TTableName extends TableName>(
    query: EntityTable<DtoByTableName[TTableName], 'id'>,
    id: string,
  ): Promise<boolean> {
    try {
      await query.delete(
        // @ts-expect-error delete with id
        id,
      );
      return true;
    } catch (err) {
      return false;
    }
  }

  private rebuildWithFilters<
    TData extends { id: string },
    TPopulatedEntity extends { id: string },
  >(
    query: Pick<EntityTable<TData, 'id'>, 'filter' | 'toArray'>,
    filters: Filter<TPopulatedEntity>[] = [],
  ) {
    for (const filter of filters) {
      query = this.rebuildWithFilter(query, filter);
    }
    return query as Collection<
      TData,
      IDType<TData, 'id'>,
      InsertType<TData, 'id'>
    >;
  }

  private rebuildWithFilter<
    TData extends { id: string },
    TPopulatedEntity extends { id: string },
  >(
    query: Pick<EntityTable<TData, 'id'>, 'filter' | 'toArray'>,
    filter: Filter<TPopulatedEntity>,
  ) {
    const [, operator] = filter;
    const applyOperator = operatorMapperDexie[operator];
    return applyOperator<TData>(
      query,
      // @ts-expect-error filter
      filter,
    );
  }

  private async applyPopulatorsForGet<
    TData extends { id: string },
    TPopulator extends Populator<TableName, DtoByTableName[TableName], string>,
  >(result: TData, populators: TPopulator[] = []) {
    for (const populator of populators) {
      const query = this.getRelatedTable(populator.tableName);
      await this.applyPopulatorForGet(result, populator, query);
    }
  }

  private async applyPopulators<
    TData extends { id: string },
    TPopulator extends Populator<TableName, DtoByTableName[TableName], string>,
  >(results: TData[], populators: TPopulator[] = []): Promise<void> {
    for (const populator of populators) {
      await this.applyPopulator(results, populator);
    }
  }

  private async applyPopulatorForGet<
    TData extends { id: string },
    TTableName extends TableName,
    TPopulatedEntity extends DtoByTableName[TTableName],
    TPopulatedAs extends string,
  >(
    result: TData,
    populator: Populator<TTableName, TPopulatedEntity, TPopulatedAs>,
    query: EntityTable<DtoByTableName[TTableName], 'id'>,
  ) {
    // const query = this.getRelatedTable(populator.tableName);

    if (populator.isMany) {
      // @ts-expect-error result[populator.as]
      result[populator.as] = await this.getAll(
        query,
        new Finder(populator.tableName, populator.populators, [
          // @ts-expect-error populator.foreignKey
          [populator.foreignKey, '$equals', result.id],
          ...populator.filters,
        ]),
      );
    } else {
      // @ts-expect-error result[populator.as]
      result[populator.as] = await this.get(
        query,
        new Finder(populator.tableName, populator.populators, [
          // @ts-expect-error populator.foreignKey
          ['id', '$equals', result[populator.foreignKey]],
          ...populator.filters,
        ]),
      );
    }
  }

  private async applyPopulator<
    TData extends { id: string },
    TTableName extends TableName,
    TPopulatedEntity extends DtoByTableName[TTableName],
    TPopulatedAs extends string,
  >(
    results: TData[],
    populator: Populator<TTableName, TPopulatedEntity, TPopulatedAs>,
  ) {
    const query = this.getRelatedTable(populator.tableName);
    for (const result of results) {
      await this.applyPopulatorForGet(result, populator, query);
      // if (populator.isMany) {
      //   // @ts-expect-error result[populator.as]
      //   result[populator.as] = await this.getAll(
      //     query,
      //     new Finder(populator.tableName, populator.populators, [
      //       // @ts-expect-error populator.foreignKey
      //       [populator.foreignKey, '$equals', result.id],
      //       ...populator.filters,
      //     ]),
      //   );
      //   // @ts-expect-error result[populator.as]
      //   result[populator.as] = await this.getAll(
      //     query,
      //     new Finder(populator.tableName, populator.populators, [
      //       // @ts-expect-error populator.foreignKey
      //       [populator.foreignKey, '$equals', result.id],
      //       ...populator.filters,
      //     ]),
      //   );
      // } else {
      //   // @ts-expect-error result[populator.as]
      //   result[populator.as] = await this.get(
      //     query,
      //     new Finder(populator.tableName, populator.populators, [
      //       // @ts-expect-error populator.foreignKey
      //       ['id', '$equals', result[populator.foreignKey]],
      //       ...populator.filters,
      //     ]),
      //   );
      // }
    }
  }

  getRelatedTable<TTableName extends TableName>(tableName: TTableName) {
    return this.db[tableName] as unknown as EntityTable<
      DtoByTableName[TTableName],
      'id'
    >;
  }
}
