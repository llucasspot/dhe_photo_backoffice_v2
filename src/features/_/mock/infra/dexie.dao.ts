import { Collection, EntityTable, IDType, InsertType } from 'dexie';

import { Finder, Populator } from '../daos';
import { DtoByTableName } from '../daos';
import { Dao, Filter, FilterOperator } from '../daos';
import { DexieConnexion, DexieEntityTable } from '../database';

type OperatorMapperr<
  TData extends { id: string },
  TFilterOperator extends FilterOperator = FilterOperator,
> = (
  query: Pick<EntityTable<TData, 'id'>, 'filter'>,
  filter: Filter<TData, TFilterOperator>,
) => Collection<TData, IDType<TData, 'id'>, InsertType<TData, 'id'>>;

export class DexieDao<TTableName extends keyof DtoByTableName>
  implements Dao<TTableName>
{
  protected query: EntityTable<DtoByTableName[TTableName], 'id'>;
  private connexion: DexieConnexion;
  private tableName: TTableName;
  private operatorMapperr = {
    $equals: <TData extends { id: string }>(
      query: Pick<EntityTable<TData, 'id'>, 'filter'>,
      [key, , value]: Filter<TData, '$equals'>,
    ) => query.filter((data) => data[key] === value),
    $notEquals: <TData extends { id: string }>(
      query: Pick<EntityTable<TData, 'id'>, 'filter'>,
      [key, , value]: Filter<TData, '$notEquals'>,
    ) => query.filter((data) => data[key] != value),
    $in: <TData extends { id: string }>(
      query: Pick<EntityTable<TData, 'id'>, 'filter'>,
      [key, , value]: Filter<TData, '$in'>,
    ) => query.filter((data) => value.includes(data[key])),
    $like: <TData extends { id: string }>(
      query: Pick<EntityTable<TData, 'id'>, 'filter'>,
      [key, , value]: Filter<TData, '$like'>,
    ) =>
      query.filter((data) => {
        if (typeof data[key] != 'string') return true;
        return (data[key] as string)
          .toLowerCase()
          .startsWith(value.toLowerCase());
      }),
  } as const satisfies {
    $equals: OperatorMapperr<DtoByTableName[TTableName], '$equals'>;
    $notEquals: OperatorMapperr<DtoByTableName[TTableName], '$notEquals'>;
    $in: OperatorMapperr<DtoByTableName[TTableName], '$in'>;
    $like: OperatorMapperr<DtoByTableName[TTableName], '$like'>;
  };

  constructor(connexion: DexieConnexion, tableName: TTableName) {
    this.connexion = connexion;
    this.tableName = tableName;
    this.query = this.getRelatedTable(tableName);
  }

  async getAll<TPopulatedEntity extends DtoByTableName[TTableName]>(
    finder?: Finder<TTableName, TPopulatedEntity>,
  ): Promise<DtoByTableName[TTableName][] | TPopulatedEntity[]> {
    const query = this.getRelatedTable(this.tableName);
    this.applyFilters(query, finder?.filters);
    const results = await query.toArray();
    await this.applyPopulators(results, finder?.populators);
    return results;
  }

  async getById(id: string): Promise<DtoByTableName[TTableName] | undefined> {
    const query = this.query;
    return query.get({ id });
  }

  async get<TPopulatedEntity extends DtoByTableName[TTableName]>(
    finder?: Finder<TTableName, TPopulatedEntity>,
  ): Promise<DtoByTableName[TTableName] | TPopulatedEntity | undefined> {
    const query = this.query;
    const result = await this.applyFiltersForGet(query, finder?.filters);
    if (!result) {
      return result;
    }
    await this.applyPopulatorsForGet(result, finder?.populators);
    return result;
  }

  async save(
    body: Omit<DtoByTableName[TTableName], 'id'>,
  ): Promise<DtoByTableName[TTableName]> {
    const query = this.query;
    const id = await query
      // @ts-expect-error save
      .add(body);
    const entity = await this.getById(id);
    return entity!;
  }

  async saveMany(
    entities: Omit<DtoByTableName[TTableName], 'id'>[],
  ): Promise<DtoByTableName[TTableName][]> {
    const res: DtoByTableName[TTableName][] = [];
    for (const entity of entities) {
      const newEntity = await this.save(entity);
      res.push(newEntity);
    }
    return res;
  }

  async update(
    id: string,
    body: Partial<DtoByTableName[TTableName]>,
  ): Promise<DtoByTableName[TTableName] | undefined> {
    const query = this.query;
    const updated = await query.update(
      // @ts-expect-error update with id
      id,
      body,
    );
    if (!updated) {
      return undefined;
    }
    const entity = await this.getById(id);
    return entity!;
  }

  async deleteById(id: string): Promise<boolean> {
    const query = this.query;
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

  private async applyFiltersForGet<
    TData extends { id: string },
    TPopulatedEntity extends { id: string },
  >(
    query: Pick<EntityTable<TData, 'id'>, 'get'>,
    filters: Filter<TPopulatedEntity>[] = [],
  ) {
    return query.get(
      filters
        .filter(([, op]) => op === '$equals')
        .map(([key, , value]) => ({
          [key]: value,
        }))
        .reduce((acc, obj) => {
          return { ...acc, ...obj };
        }, {}),
    );
  }

  private applyFilters<
    TData extends { id: string },
    TPopulatedEntity extends { id: string },
  >(
    query: Pick<EntityTable<TData, 'id'>, 'filter'>,
    filters: Filter<TPopulatedEntity>[] = [],
  ) {
    for (const filter of filters) {
      this.applyFilter(query, filter);
      // const [, operator] = filter;
      // const applyOperator = this.operatorMapperr[operator];
      // query = applyOperator(
      //   query,
      //   // @ts-expect-error filter
      //   filter,
      // );
    }
  }

  private applyFilter<
    TData extends { id: string },
    TPopulatedEntity extends { id: string },
  >(
    query: Pick<EntityTable<TData, 'id'>, 'filter'>,
    filter: Filter<TPopulatedEntity>,
  ) {
    const [, operator] = filter;
    const applyOperator = this.operatorMapperr[operator];
    query = applyOperator<TData>(
      query,
      // @ts-expect-error filter
      filter,
    );
  }

  private async applyPopulatorsForGet<
    TData extends { id: string },
    TPopulator extends Populator<
      keyof DtoByTableName,
      DtoByTableName[keyof DtoByTableName],
      string
    >,
  >(results: TData, populators: TPopulator[] = []) {
    for (const populator of populators) {
      await this.applyPopulatorForGet(results, populator);
    }
  }

  private async applyPopulators<
    TData extends { id: string },
    TPopulator extends Populator<
      keyof DtoByTableName,
      DtoByTableName[keyof DtoByTableName],
      string
    >,
  >(results: TData[], populators: TPopulator[] = []) {
    for (const populator of populators) {
      await this.applyPopulator(results, populator);
    }
  }

  private async applyPopulatorForGet<
    TData extends { id: string },
    TTableName extends keyof DtoByTableName,
    TPopulatedEntity extends DtoByTableName[TTableName],
    TPopulatedAs extends string,
  >(
    result: TData,
    populator: Populator<TTableName, TPopulatedEntity, TPopulatedAs>,
  ) {
    console.log('[DexieDao] [applyPopulatorForGet] [result] :', result);
    const query = this.getRelatedTable(populator.tableName);
    this.applyFilters(query, populator.filters);
    console.log('[DexieDao] [applyPopulatorForGet] [populator] :', populator);
    if (populator.isMany) {
      console.log('[DexieDao] [applyPopulatorForGet] [lala] : ', query);
      const relatedResults = await query.toArray();
      console.log(
        '[DexieDao] [applyPopulatorForGet] [relatedResults] :',
        relatedResults,
      );
      await this.applyPopulators(relatedResults, populator.populators);
      // @ts-expect-error Type TPopulatedAs cannot be used to index type TData
      result[populator.as] = relatedResults;
    } else {
      const relatedResult = await query.get({ id: populator.foreignKey });
      // @ts-expect-error Type TPopulatedAs cannot be used to index type TData
      result[populator.as] = relatedResult;
    }
  }

  private async applyPopulator<
    TData extends { id: string },
    TTableName extends keyof DtoByTableName,
    TPopulatedEntity extends DtoByTableName[TTableName],
    TPopulatedAs extends string,
  >(
    results: TData[],
    populator: Populator<TTableName, TPopulatedEntity, TPopulatedAs>,
  ) {
    const query = this.getRelatedTable(populator.tableName);
    this.applyFilters(query, populator.filters);
    if (populator.isMany) {
      const relatedResults = await query.toArray();
      await this.applyPopulators(relatedResults, populator.populators);
      results = results.map((result) => {
        // @ts-expect-error Type TPopulatedAs cannot be used to index type TData
        result[populator.as] = relatedResults;
        return result;
      });
    } else {
      const relatedResult = await query.get({ id: populator.foreignKey });
      results = results.map((result) => {
        // @ts-expect-error Type TPopulatedAs cannot be used to index type TData
        result[populator.as] = relatedResult;
        return result;
      });
    }
  }

  private getRelatedTable<TTableName extends keyof DexieEntityTable>(
    tableName: TTableName,
  ) {
    return this.connexion[tableName] as unknown as EntityTable<
      DtoByTableName[TTableName],
      'id'
    >;
  }
}
