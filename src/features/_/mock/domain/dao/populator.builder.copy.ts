/* eslint-disable @typescript-eslint/no-explicit-any */
import { Filter } from './dao';
import { DtoByTableName, TableName } from './dto-by-table-name.type';

// type EntityI = { id: string };

export type PopulateWith<
  TEntityPopulated,
  TEntity,
  TAs extends string,
> = TEntityPopulated & {
  [K in TAs]?: TEntity;
};

export type PopulateManyWith<
  TEntityPopulated,
  TEntity,
  TAs extends string,
> = TEntityPopulated & {
  [K in TAs]: TEntity[];
};

type AugmentedEntity<T, K extends string, V> = T extends object
  ? T & { [P in K]?: V }
  : never;

export class Populator<
  TDtoByTableName extends DtoByTableName,
  TTableName extends keyof TDtoByTableName,
  TPopulatedEntity extends TDtoByTableName[TTableName],
  TPopulatedAs extends string,
> {
  public isMany = false;
  public foreignKey?: string;

  constructor(
    public readonly as: TPopulatedAs,
    public readonly tableName: TTableName,
    public readonly populators: Populator<
      DtoByTableName,
      TableName,
      DtoByTableName[TableName],
      string
    >[] = [],
    public readonly filters: Filter<TPopulatedEntity>[] = [],
    public readonly required: boolean,
  ) {}

  static builder<
    TDtoByTableName extends DtoByTableName,
    TTableName extends keyof TDtoByTableName,
    TPopulatedEntity extends TDtoByTableName[TTableName],
    TPopulatedAs extends string,
  >(as: TPopulatedAs, tableName: TTableName) {
    return new PopulatorBuilder<
      TDtoByTableName,
      TTableName,
      TPopulatedEntity,
      TPopulatedAs
    >(as, tableName);
  }
}

class PopulatorBuilder<
  TDtoByTableName extends DtoByTableName,
  TTableName extends keyof TDtoByTableName,
  TPopulatedEntity extends TDtoByTableName[TTableName],
  TPopulatedAs extends string,
> {
  constructor(
    private readonly as: TPopulatedAs,
    public readonly tableName: TTableName,
    private readonly populators: Populator<
      DtoByTableName,
      TableName,
      DtoByTableName[TableName],
      string
    >[] = [],
    private readonly filters: Filter<TPopulatedEntity>[] = [],
    private _required: boolean = false,
  ) {}

  required() {
    this._required = true;
    return this;
  }

  populateWith<
    TForeignKey extends keyof TPopulatedEntity,
    TTDtoByTableName extends DtoByTableName,
    TTTableName extends keyof TTDtoByTableName,
    TEntity extends TTDtoByTableName[TTTableName],
    TAs extends string,
  >(
    foreignKey: TForeignKey,
    populator: Populator<TTDtoByTableName, TTTableName, TEntity, TAs>,
  ) {
    populator.foreignKey = foreignKey as string;
    // @ts-expect-error push
    this.populators.push(populator);
    return this as PopulatorBuilder<
      TDtoByTableName,
      TTableName,
      // PopulateWith<TPopulatedEntity, TEntity, TAs>,
      // TPopulatedEntity,
      // TPopulatedEntity & {
      //   [K in TAs]?: TEntity;
      // },
      AugmentedEntity<TPopulatedEntity, TAs, TEntity>,
      TPopulatedAs
    >;
  }

  populateManyWith<
    TTDtoByTableName extends DtoByTableName,
    TTTableName extends keyof TTDtoByTableName,
    TEntity extends TTDtoByTableName[TTTableName],
    TAs extends string,
    TForeignKey extends keyof TEntity,
  >(
    foreignKey: TForeignKey,
    populator: Populator<TTDtoByTableName, TTTableName, TEntity, TAs>,
  ) {
    populator.foreignKey = foreignKey as string;
    populator.isMany = true;
    // @ts-expect-error push
    this.populators.push(populator);
    return this as PopulatorBuilder<
      TDtoByTableName,
      TTableName,
      PopulateManyWith<TPopulatedEntity, TEntity, TAs>,
      TPopulatedAs
    >;
  }

  whereField([
    field,
    operator,
    value,
  ]: Filter<TPopulatedEntity>): PopulatorBuilder<
    TDtoByTableName,
    TTableName,
    TPopulatedEntity,
    TPopulatedAs
  > {
    if (value == undefined) {
      return this;
    }
    // @ts-expect-error filter value
    this.filters.push([field, value, operator]);
    return this;
  }

  build() {
    return new Populator<
      TDtoByTableName,
      TTableName,
      TPopulatedEntity,
      TPopulatedAs
    >(this.as, this.tableName, this.populators, this.filters, this._required);
  }
}

export type ExtractPopulatedEntity<TFinder> =
  TFinder extends Finder<any, any, infer TPopulatedEntity>
    ? TPopulatedEntity
    : never;

export class Finder<
  TDtoByTableName extends DtoByTableName,
  TTableName extends keyof TDtoByTableName,
  TPopulatedEntity extends TDtoByTableName[TTableName],
> {
  constructor(
    public readonly tableName: TTableName,
    public readonly populators: Populator<
      DtoByTableName,
      TableName,
      DtoByTableName[TableName],
      string
    >[] = [],
    public readonly filters: Filter<TPopulatedEntity>[] = [],
  ) {}

  filtersWith(
    filter: Filter<TPopulatedEntity>,
  ): Finder<TDtoByTableName, TTableName, TPopulatedEntity> {
    this.filters.push(filter);
    return this;
  }

  populateWith<
    TForeignKey extends keyof TPopulatedEntity,
    TTDtoByTableName extends DtoByTableName,
    TTTableName extends keyof TTDtoByTableName,
    TEntity extends TTDtoByTableName[TTTableName],
    TAs extends string,
  >(
    foreignKey: TForeignKey,
    populator: Populator<TTDtoByTableName, TTTableName, TEntity, TAs>,
  ) {
    populator.foreignKey = foreignKey as string;
    // @ts-expect-error push
    this.populators.push(populator);
    return this as Finder<
      TDtoByTableName,
      TTableName,
      PopulateWith<TPopulatedEntity, TEntity, TAs>
    >;
  }

  populateManyWith<
    TTDtoByTableName extends DtoByTableName,
    TTTableName extends keyof TTDtoByTableName,
    TEntity extends TTDtoByTableName[TTTableName],
    TAs extends string,
    TForeignKey extends keyof TEntity,
  >(
    foreignKey: TForeignKey,
    populator: Populator<TTDtoByTableName, TTTableName, TEntity, TAs>,
  ) {
    populator.foreignKey = foreignKey as string;
    populator.isMany = true;
    // @ts-expect-error push
    this.populators.push(populator);
    return this as Finder<
      TDtoByTableName,
      TTableName,
      PopulateManyWith<TPopulatedEntity, TEntity, TAs>
    >;
  }
}
