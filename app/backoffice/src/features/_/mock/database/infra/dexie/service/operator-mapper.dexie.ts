import { Collection, EntityTable, IDType, InsertType } from 'dexie';

import { Filter } from '../../../domain';

export const operatorMapperDexie = {
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
  $equals: <TData extends { id: string }>(
    query: Pick<EntityTable<TData, 'id'>, 'filter'>,
    filter: Filter<TData, '$equals'>,
  ) => Collection<TData, IDType<TData, 'id'>, InsertType<TData, 'id'>>;
  $notEquals: <TData extends { id: string }>(
    query: Pick<EntityTable<TData, 'id'>, 'filter'>,
    filter: Filter<TData, '$notEquals'>,
  ) => Collection<TData, IDType<TData, 'id'>, InsertType<TData, 'id'>>;
  $in: <TData extends { id: string }>(
    query: Pick<EntityTable<TData, 'id'>, 'filter'>,
    filter: Filter<TData, '$in'>,
  ) => Collection<TData, IDType<TData, 'id'>, InsertType<TData, 'id'>>;
  $like: <TData extends { id: string }>(
    query: Pick<EntityTable<TData, 'id'>, 'filter'>,
    filter: Filter<TData, '$like'>,
  ) => Collection<TData, IDType<TData, 'id'>, InsertType<TData, 'id'>>;
};
