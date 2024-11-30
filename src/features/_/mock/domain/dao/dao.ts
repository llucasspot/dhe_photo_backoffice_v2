import { DtoByTableName } from './dto-by-table-name.type';
import { Finder } from './populator.builder';

export abstract class Dao<
  TDtoByTableName extends DtoByTableName,
  TTableName extends keyof TDtoByTableName,
> {
  abstract getAll(): Promise<TDtoByTableName[TTableName][]>;
  abstract getAll<
    TDtoByTableName extends DtoByTableName,
    TTableName extends keyof TDtoByTableName,
    TPopulatedEntity extends TDtoByTableName[TTableName],
    TFilterOmitFields extends keyof TPopulatedEntity | '' = '',
  >(
    finder: Finder<
      TDtoByTableName,
      TTableName,
      TPopulatedEntity,
      TFilterOmitFields
    >,
  ): Promise<TPopulatedEntity[]>;

  abstract getById(
    id: string,
  ): Promise<TDtoByTableName[TTableName] | undefined | null>;

  abstract get(): Promise<TDtoByTableName[TTableName] | null>;
  abstract get<
    TDtoByTableName extends DtoByTableName,
    TTableName extends keyof TDtoByTableName,
    TPopulatedEntity extends TDtoByTableName[TTableName],
    TFilterOmitFields extends keyof TPopulatedEntity | '' = '',
  >(
    finder: Finder<
      TDtoByTableName,
      TTableName,
      TPopulatedEntity,
      TFilterOmitFields
    >,
  ): Promise<TPopulatedEntity | undefined | null>;

  abstract save(
    body: Omit<TDtoByTableName[TTableName], 'id'>,
  ): Promise<TDtoByTableName[TTableName]>;

  abstract saveMany(
    bodies: Omit<TDtoByTableName[TTableName], 'id'>[],
  ): Promise<TDtoByTableName[TTableName][]>;

  abstract update(
    id: string,
    body: Partial<TDtoByTableName[TTableName]>,
  ): Promise<TDtoByTableName[TTableName] | undefined | null>;

  abstract deleteById(id: string): Promise<boolean>;
}

export type FilterOperator = '$equals' | '$notEquals' | '$in' | '$like';

export type Filter<
  TData,
  TOperator extends FilterOperator = FilterOperator,
> = TOperator extends '$equals' | '$notEquals'
  ? [key: keyof TData, operator: TOperator, value: TData[keyof TData]]
  : TOperator extends '$in'
    ? [key: keyof TData, operator: TOperator, value: TData[keyof TData][]]
    : TOperator extends '$like'
      ? [key: keyof TData, operator: TOperator, value: string]
      : never;
