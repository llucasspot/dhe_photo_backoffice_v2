/* eslint-disable @typescript-eslint/no-explicit-any */
import { DtoByTableName, TableName } from './dto-by-table-name.type';

import { Filter } from '#mock';

type EntityI = { id: string };

export type PopulateWith<
  TEntityPopulated extends EntityI,
  TEntity extends EntityI | EntityI[],
  TAs extends string,
> = TEntityPopulated & {
  [K in TAs]?: TEntity;
};

export type PopulateManyWith<
  TEntityPopulated extends EntityI,
  TEntity extends EntityI,
  TAs extends string,
> = TEntityPopulated & {
  [K in TAs]: TEntity[];
};

export class Populator<
  TTableName extends TableName,
  TPopulatedEntity extends DtoByTableName[TTableName],
  TPopulatedAs extends string,
> {
  public isMany = false;
  public foreignKey?: string;
  constructor(
    public readonly as: TPopulatedAs,
    public readonly tableName: TTableName,
    public readonly populators: Populator<
      TableName,
      DtoByTableName[TableName],
      string
    >[],
    public readonly filters: Filter<TPopulatedEntity>[],
    public readonly required: boolean,
  ) {}

  static builder<
    TTableName extends TableName,
    TPopulatedEntity extends DtoByTableName[TTableName],
    TPopulatedAs extends string,
  >(as: TPopulatedAs, tableName: TTableName) {
    return new PopulatorBuilder<TTableName, TPopulatedEntity, TPopulatedAs>(
      as,
      tableName,
    );
  }
}

class PopulatorBuilder<
  TTableName extends TableName,
  TPopulatedEntity extends DtoByTableName[TTableName],
  TPopulatedAs extends string,
> {
  constructor(
    private readonly as: TPopulatedAs,
    public readonly tableName: TTableName,
    private readonly populators: Populator<
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
    TTableName extends TableName,
    TEntity extends DtoByTableName[TTableName],
    TAs extends string,
  >(foreignKey: TForeignKey, populator: Populator<TTableName, TEntity, TAs>) {
    populator.foreignKey = foreignKey as string;
    // @ts-expect-error push
    this.populators.push(populator);
    return this as PopulatorBuilder<
      (typeof this)['tableName'],
      PopulateWith<TPopulatedEntity, TEntity, TAs>,
      TPopulatedAs
    >;
  }

  populateManyWith<
    TTableName extends TableName,
    TEntity extends DtoByTableName[TTableName],
    TAs extends string,
    TForeignKey extends keyof TEntity,
  >(foreignKey: TForeignKey, populator: Populator<TTableName, TEntity, TAs>) {
    populator.foreignKey = foreignKey as string;
    populator.isMany = true;
    // @ts-expect-error push
    this.populators.push(populator);
    return this as PopulatorBuilder<
      (typeof this)['tableName'],
      PopulateManyWith<TPopulatedEntity, TEntity, TAs>,
      TPopulatedAs
    >;
  }

  whereField([
    field,
    operator,
    value,
  ]: Filter<TPopulatedEntity>): PopulatorBuilder<
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
    return new Populator(
      this.as,
      this.tableName,
      this.populators,
      this.filters,
      this._required,
    );
  }
}

export type ExtractPopulatedEntity<TFinder> =
  TFinder extends Finder<any, infer TPopulatedEntity>
    ? TPopulatedEntity
    : never;

export class Finder<
  TTableName extends TableName,
  TPopulatedEntity extends DtoByTableName[TTableName],
> {
  constructor(
    public readonly tableName: TTableName,
    public readonly populators: Populator<
      TableName,
      DtoByTableName[TableName],
      string
    >[] = [],
    public readonly filters: Filter<TPopulatedEntity>[] = [],
  ) {}

  filtersWith(
    filter: Filter<TPopulatedEntity>,
  ): Finder<TTableName, TPopulatedEntity> {
    this.filters.push(filter);
    return this;
  }

  populateWith<
    TForeignKey extends keyof TPopulatedEntity,
    TTableName extends TableName,
    TEntity extends DtoByTableName[TTableName],
    TAs extends string,
  >(foreignKey: TForeignKey, populator: Populator<TTableName, TEntity, TAs>) {
    populator.foreignKey = foreignKey as string;
    // @ts-expect-error push
    this.populators.push(populator);
    return this as Finder<
      (typeof this)['tableName'],
      PopulateWith<TPopulatedEntity, TEntity, TAs>
    >;
  }

  populateManyWith<
    TTableName extends TableName,
    TEntity extends DtoByTableName[TTableName],
    TAs extends string,
    TForeignKey extends keyof TEntity,
  >(foreignKey: TForeignKey, populator: Populator<TTableName, TEntity, TAs>) {
    populator.foreignKey = foreignKey as string;
    populator.isMany = true;
    // @ts-expect-error push
    this.populators.push(populator);
    return this as Finder<
      (typeof this)['tableName'],
      PopulateManyWith<TPopulatedEntity, TEntity, TAs>
    >;
  }
}
