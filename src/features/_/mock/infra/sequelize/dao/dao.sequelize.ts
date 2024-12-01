import {
  FindOptions,
  IncludeOptions,
  Model,
  ModelStatic,
  WhereOptions,
} from 'sequelize';

import { DatabaseServiceSequelizeAdapter } from '../service';
import { operatorMapperSequelize } from '../service/operator-mapper.sequelize';

import {
  DtoBySequelizeTableName,
  SequelizeTableName,
} from './dto-by-table-name.type.sequelize';

import { Dao, Filter, Finder, Populator } from '#mock/domain';

export class DaoSequelize<TTableName extends keyof DtoBySequelizeTableName>
  implements Dao<DtoBySequelizeTableName, TTableName>
{
  private model: ModelStatic<
    Model<
      DtoBySequelizeTableName[TTableName],
      Partial<DtoBySequelizeTableName[TTableName]>
    >
  >;
  constructor(
    private readonly databaseService: DatabaseServiceSequelizeAdapter,
    modelName: TTableName,
  ) {
    this.model = databaseService.getRelatedModel(modelName);
  }

  getAll(): Promise<DtoBySequelizeTableName[TTableName][]>;
  getAll<TPopulatedEntity extends DtoBySequelizeTableName[TTableName]>(
    finder: Finder<DtoBySequelizeTableName, TTableName, TPopulatedEntity>,
  ): Promise<TPopulatedEntity[]>;
  getAll<TPopulatedEntity extends DtoBySequelizeTableName[TTableName]>(
    finder?: Finder<DtoBySequelizeTableName, TTableName, TPopulatedEntity>,
  ):
    | Promise<DtoBySequelizeTableName[TTableName][]>
    | Promise<TPopulatedEntity[]> {
    const findOptions = this.buildFindOptions(finder);
    return this.model.findAll(findOptions) as unknown as Promise<
      DtoBySequelizeTableName[TTableName][] | TPopulatedEntity[]
    >;
  }

  async getById(
    id: string,
  ): Promise<DtoBySequelizeTableName[TTableName] | undefined | null> {
    return this.model.findByPk(id) as unknown as Promise<
      DtoBySequelizeTableName[TTableName] | undefined
    >;
  }

  get(): Promise<DtoBySequelizeTableName[TTableName] | null>;
  get<TPopulatedEntity extends DtoBySequelizeTableName[TTableName]>(
    finder: Finder<DtoBySequelizeTableName, TTableName, TPopulatedEntity>,
  ): Promise<TPopulatedEntity | null | undefined>;
  get<TPopulatedEntity extends DtoBySequelizeTableName[TTableName]>(
    finder?: Finder<DtoBySequelizeTableName, TTableName, TPopulatedEntity>,
  ): Promise<
    DtoBySequelizeTableName[TTableName] | TPopulatedEntity | null | undefined
  > {
    const findOptions: FindOptions = this.buildFindOptions(finder);
    return this.model.findOne(findOptions) as Promise<
      DtoBySequelizeTableName[TTableName] | TPopulatedEntity | undefined | null
    >;
  }

  async save(
    body: Omit<DtoBySequelizeTableName[TTableName], 'id'>,
  ): Promise<DtoBySequelizeTableName[TTableName]> {
    const instance = await this.model.create(
      // @ts-expect-error sequelize create body
      body,
    );
    return instance.toJSON() as DtoBySequelizeTableName[TTableName];
  }

  async saveMany(
    entities: Omit<DtoBySequelizeTableName[TTableName], 'id'>[],
  ): Promise<DtoBySequelizeTableName[TTableName][]> {
    const instances = await this.model.bulkCreate(
      // @ts-expect-error sequelize bulkCreate body
      entities,
    );
    return instances.map((instance) =>
      instance.toJSON(),
    ) as DtoBySequelizeTableName[TTableName][];
  }

  async update(
    id: string,
    body: Partial<DtoBySequelizeTableName[TTableName]>,
  ): Promise<DtoBySequelizeTableName[TTableName] | undefined | null> {
    const [affectedRows] = await this.model.update(body, {
      // @ts-expect-error sequelize update where
      where: { id },
    });
    if (affectedRows === 0) return undefined;
    return this.getById(id);
  }

  async deleteById(id: string): Promise<boolean> {
    const deletedCount = await this.model.destroy({
      // @ts-expect-error sequelize destroy where
      where: { id },
    });
    return deletedCount > 0;
  }

  private buildFindOptions<
    TPopulatedEntity extends DtoBySequelizeTableName[TTableName],
  >(finder?: Finder<DtoBySequelizeTableName, TTableName, TPopulatedEntity>) {
    const findOptions: FindOptions<DtoBySequelizeTableName[TTableName]> = {};
    if (finder?.filters) {
      this.applyFilters(findOptions, finder.filters);
    }
    if (finder?.populators) {
      // @ts-expect-error Type string is not assignable to type "id"
      this.applyPopulators(findOptions, finder.populators);
    }
    return findOptions;
  }

  private applyFilters<
    TData extends { id: string },
    TPopulatedEntity extends { id: string },
  >(findOptions: FindOptions<TData>, filters: Filter<TPopulatedEntity>[]) {
    findOptions.where = filters.reduce((where: WhereOptions<TData>, filter) => {
      const [key, operator] = filter;
      const applyOperator = operatorMapperSequelize[operator];
      // @ts-expect-error where
      where[key] = applyOperator(
        // @ts-expect-error filter
        filter,
      );
      return where;
    }, {});
  }

  private applyPopulators<
    TData extends { id: string },
    TPopulator extends Populator<
      DtoBySequelizeTableName,
      SequelizeTableName,
      DtoBySequelizeTableName[SequelizeTableName],
      string
    >,
  >(findOptions: FindOptions<TData>, populators: TPopulator[]) {
    findOptions.include = populators.map((populator) => {
      const include: IncludeOptions = {
        model: this.databaseService.getRelatedModel(populator.tableName),
        as: populator.as,
      };
      if (populator.filters) {
        this.applyFilters(include, populator.filters);
      }
      if (populator.populators) {
        this.applyPopulators(include, populator.populators);
      }
      return include;
    });
  }
}
