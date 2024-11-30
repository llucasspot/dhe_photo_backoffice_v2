import Dexie, { Collection, EntityTable, IDType, InsertType } from 'dexie';
import { v4 as uuidv4 } from 'uuid';

import {
  DexieTableName,
  DtoByDexieTableName,
} from '../dao/dto-by-table-name.type.dexie';

import { operatorMapperDexie } from './operator-mapper.dexie';

import { singleton } from '#di';
import { Filter, Finder, Populator } from '#mock/domain';
import { DatabaseServicePort } from '#mock/domain';

export type DexieConnexion = Dexie & {
  [K in DexieTableName]: EntityTable<DtoByDexieTableName[K], 'id'>;
};

@singleton()
export class DatabaseServiceDexieAdapter
  implements DatabaseServicePort<DexieConnexion>
{
  private db: DexieConnexion;

  constructor() {
    const db: DexieConnexion = new Dexie('MyDatabase') as DexieConnexion;
    this.db = db;

    db.version(1).stores({
      pictures: 'id',
      studentPictures: 'id, fileId, studentId',
      groupPictures: 'id, fileId, klassId',
      klasses: 'id, projectId, name',
      products: 'id, name, description, longSize, shortSize',
      projects:
        'id, schoolId, name, orderEndDate, shotDate, messageForClients, state',
      schools: 'id, name, currency, city',
      students: 'id, klassId, code',
      dexieFileData: 'id, pictureId, blob',
    } as const satisfies {
      [K in DexieTableName]: string;
    });
    db.tables.forEach((table) => {
      table.hook('creating', (_primaryKey, obj) => {
        if (!obj.id) {
          obj.id = uuidv4();
        }
      });
    });
    if (!db.isOpen()) {
      db.open();
    }
  }

  getConnexion() {
    return this.db;
  }

  async getAll<
    TTableName extends DexieTableName,
    TPopulatedEntity extends DtoByDexieTableName[TTableName],
  >(
    query: Pick<
      EntityTable<DtoByDexieTableName[TTableName], 'id'>,
      'filter' | 'toArray'
    >,
    finder?: Finder<DtoByDexieTableName, TTableName, TPopulatedEntity>,
  ): Promise<DtoByDexieTableName[TTableName][] | TPopulatedEntity[]> {
    const _query = this.rebuildWithFilters(query, finder?.filters);
    const results = await _query.toArray();
    // @ts-expect-error Type string is not assignable to type "id"
    await this.applyPopulators(results, finder?.populators);
    return results;
  }

  async getById<TTableName extends DexieTableName>(
    query: EntityTable<DtoByDexieTableName[TTableName], 'id'>,
    id: string,
  ): Promise<DtoByDexieTableName[TTableName] | undefined> {
    return query.get({ id });
  }

  async get<
    TTableName extends DexieTableName,
    TPopulatedEntity extends DtoByDexieTableName[TTableName],
  >(
    query: Pick<
      EntityTable<DtoByDexieTableName[TTableName], 'id'>,
      'filter' | 'toArray'
    >,
    finder?: Finder<DtoByDexieTableName, TTableName, TPopulatedEntity>,
  ): Promise<DtoByDexieTableName[TTableName] | TPopulatedEntity | undefined> {
    const _query = this.rebuildWithFilters(query, finder?.filters);
    const result = await _query.first();
    if (!result) {
      return result;
    }
    // @ts-expect-error Type string is not assignable to type "id"
    await this.applyPopulatorsForGet(result, finder?.populators);
    return result;
  }

  async save<TTableName extends DexieTableName>(
    query: EntityTable<DtoByDexieTableName[TTableName], 'id'>,
    body: Omit<DtoByDexieTableName[TTableName], 'id'>,
  ): Promise<DtoByDexieTableName[TTableName]> {
    const id = await query
      // @ts-expect-error save
      .add(body);
    const entity = await this.getById(query, id);
    return entity!;
  }

  async saveMany<TTableName extends DexieTableName>(
    query: EntityTable<DtoByDexieTableName[TTableName], 'id'>,
    entities: Omit<DtoByDexieTableName[TTableName], 'id'>[],
  ): Promise<DtoByDexieTableName[TTableName][]> {
    const res: DtoByDexieTableName[TTableName][] = [];
    for (const entity of entities) {
      const newEntity = await this.save(query, entity);
      res.push(newEntity);
    }
    return res;
  }

  async update<TTableName extends DexieTableName>(
    query: EntityTable<DtoByDexieTableName[TTableName], 'id'>,
    id: string,
    body: Partial<DtoByDexieTableName[TTableName]>,
  ): Promise<DtoByDexieTableName[TTableName] | undefined> {
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

  async deleteById<TTableName extends DexieTableName>(
    query: EntityTable<DtoByDexieTableName[TTableName], 'id'>,
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

  getRelatedTable<TTableName extends DexieTableName>(tableName: TTableName) {
    return this.db[tableName] as unknown as EntityTable<
      DtoByDexieTableName[TTableName],
      'id'
    >;
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
    TPopulator extends Populator<
      DtoByDexieTableName,
      DexieTableName,
      DtoByDexieTableName[DexieTableName],
      string
    >,
  >(result: TData, populators: TPopulator[] = []) {
    for (const populator of populators) {
      const query = this.getRelatedTable(populator.tableName);
      await this.applyPopulatorForGet(result, populator, query);
    }
  }

  private async applyPopulators<
    TData extends { id: string },
    TPopulator extends Populator<
      DtoByDexieTableName,
      DexieTableName,
      DtoByDexieTableName[DexieTableName],
      string
    >,
  >(results: TData[], populators: TPopulator[] = []): Promise<void> {
    for (const populator of populators) {
      await this.applyPopulator(results, populator);
    }
  }

  private async applyPopulatorForGet<
    TData extends { id: string },
    TTableName extends DexieTableName,
    TPopulatedEntity extends DtoByDexieTableName[TTableName],
    TPopulatedAs extends string,
  >(
    result: TData,
    populator: Populator<
      DtoByDexieTableName,
      TTableName,
      TPopulatedEntity,
      TPopulatedAs
    >,
    query: EntityTable<DtoByDexieTableName[TTableName], 'id'>,
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
    TTableName extends DexieTableName,
    TPopulatedEntity extends DtoByDexieTableName[TTableName],
    TPopulatedAs extends string,
  >(
    results: TData[],
    populator: Populator<
      DtoByDexieTableName,
      TTableName,
      TPopulatedEntity,
      TPopulatedAs
    >,
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
}
