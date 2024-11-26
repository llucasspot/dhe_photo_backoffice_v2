import { DtoByTableName } from './dto-by-table-name.type';
import { Finder } from './populator.builder';

export abstract class Dao<TTableName extends keyof DtoByTableName> {
  abstract getAll(): Promise<DtoByTableName[TTableName][]>;
  abstract getAll<TPopulatedEntity extends DtoByTableName[TTableName]>(
    finder: Finder<TTableName, TPopulatedEntity>,
  ): Promise<TPopulatedEntity[]>;
  abstract getAll<TPopulatedEntity extends DtoByTableName[TTableName]>(
    finder?: Finder<TTableName, TPopulatedEntity>,
  ): Promise<DtoByTableName[TTableName][] | TPopulatedEntity[]>;

  abstract getById(
    id: string,
  ): Promise<DtoByTableName[TTableName] | undefined | null>;

  abstract get(): Promise<DtoByTableName[TTableName] | undefined | null>;
  abstract get<TPopulatedEntity extends DtoByTableName[TTableName]>(
    finder: Finder<TTableName, TPopulatedEntity>,
  ): Promise<TPopulatedEntity | undefined>;
  abstract get<TPopulatedEntity extends DtoByTableName[TTableName]>(
    finder?: Finder<TTableName, TPopulatedEntity>,
  ): Promise<DtoByTableName[TTableName] | TPopulatedEntity | undefined | null>;

  abstract save(
    body: Omit<DtoByTableName[TTableName], 'id'>,
  ): Promise<DtoByTableName[TTableName]>;

  abstract saveMany(
    bodies: Omit<DtoByTableName[TTableName], 'id'>[],
  ): Promise<DtoByTableName[TTableName][]>;

  abstract update(
    id: string,
    body: Partial<DtoByTableName[TTableName]>,
  ): Promise<DtoByTableName[TTableName] | undefined | null>;

  abstract deleteById(id: string): Promise<boolean>;
}

export type FilterOperator = '$equals' | '$notEquals' | '$in' | '$like';

export type Filter<
  TData extends object,
  TOperator extends FilterOperator = FilterOperator,
> = TOperator extends '$equals' | '$notEquals'
  ? [key: keyof TData, operator: TOperator, value: TData[keyof TData]]
  : TOperator extends '$in'
    ? [key: keyof TData, operator: TOperator, value: TData[keyof TData][]]
    : TOperator extends '$like'
      ? [key: keyof TData, operator: TOperator, value: string]
      : never;
