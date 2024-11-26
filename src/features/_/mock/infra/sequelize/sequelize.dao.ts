import {
  FindOptions,
  IncludeOptions,
  Model,
  ModelStatic,
  Op,
  WhereOptions,
} from 'sequelize';

import {
  Dao,
  DtoByTableName,
  Filter,
  Finder,
  Populator,
  TableName,
} from '../../daos';

import {
  DatabaseServiceSequelizeAdapter,
  SequelizeConnexion,
} from './database.service.sequelize-adapter';

export class SequelizeDao<TTableName extends TableName>
  implements Dao<TTableName>
{
  private model: ModelStatic<
    Model<DtoByTableName[TTableName], Partial<DtoByTableName[TTableName]>>
  >;
  private connexion: SequelizeConnexion;
  private operatorMapper = {
    $equals: ([, , value]) => ({ [Op.eq]: value }),
    $notEquals: ([, , value]) => ({ [Op.ne]: value }),
    $in: ([, , value]) => ({ [Op.in]: value }),
    $like: ([, , value]) => ({ [Op.like]: `%${value}%` }),
  } as const satisfies {
    $equals: <TData extends { id: string }>([, , value]: Filter<
      TData,
      '$equals'
    >) => {
      [Op.eq]: typeof value;
    };
    $notEquals: <TData extends { id: string }>([, , value]: Filter<
      TData,
      '$notEquals'
    >) => {
      [Op.ne]: typeof value;
    };
    $in: <TData extends { id: string }>([, , value]: Filter<TData, '$in'>) => {
      [Op.in]: typeof value;
    };
    $like: <TData extends { id: string }>([, , value]: Filter<
      TData,
      '$like'
    >) => {
      [Op.like]: typeof value;
    };
  };

  constructor(
    databaseService: DatabaseServiceSequelizeAdapter,
    modelName: TTableName,
  ) {
    this.connexion = databaseService.getConnexion();
    this.model = this.getRelatedModel(modelName);
  }

  async getAll<TPopulatedEntity extends DtoByTableName[TTableName]>(
    finder?: Finder<TTableName, TPopulatedEntity>,
  ): Promise<DtoByTableName[TTableName][] | TPopulatedEntity[]> {
    const findOptions = this.buildFindOptions(finder);
    return this.model.findAll(findOptions) as unknown as Promise<
      DtoByTableName[TTableName][] | TPopulatedEntity[]
    >;
  }

  async getById(
    id: string,
  ): Promise<DtoByTableName[TTableName] | undefined | null> {
    return this.model.findByPk(id) as unknown as Promise<
      DtoByTableName[TTableName] | undefined
    >;
  }

  async get<TPopulatedEntity extends DtoByTableName[TTableName]>(
    finder?: Finder<TTableName, TPopulatedEntity>,
  ): Promise<DtoByTableName[TTableName] | TPopulatedEntity | undefined | null> {
    const findOptions: FindOptions = this.buildFindOptions(finder);
    return this.model.findOne(findOptions) as Promise<
      DtoByTableName[TTableName] | TPopulatedEntity | undefined | null
    >;
  }

  async save(
    body: Omit<DtoByTableName[TTableName], 'id'>,
  ): Promise<DtoByTableName[TTableName]> {
    const instance = await this.model.create(
      // @ts-expect-error sequelize create body
      body,
    );
    return instance.toJSON() as DtoByTableName[TTableName];
  }

  async saveMany(
    entities: Omit<DtoByTableName[TTableName], 'id'>[],
  ): Promise<DtoByTableName[TTableName][]> {
    const instances = await this.model.bulkCreate(
      // @ts-expect-error sequelize bulkCreate body
      entities,
    );
    return instances.map((instance) =>
      instance.toJSON(),
    ) as DtoByTableName[TTableName][];
  }

  async update(
    id: string,
    body: Partial<DtoByTableName[TTableName]>,
  ): Promise<DtoByTableName[TTableName] | undefined | null> {
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

  private buildFindOptions<TPopulatedEntity extends DtoByTableName[TTableName]>(
    finder?: Finder<TTableName, TPopulatedEntity>,
  ) {
    const findOptions: FindOptions<DtoByTableName[TTableName]> = {};
    if (finder?.filters) {
      this.applyFilters(findOptions, finder.filters);
    }
    if (finder?.populators) {
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
      const applyOperator = this.operatorMapper[operator];
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
    TPopulator extends Populator<TableName, DtoByTableName[TableName], string>,
  >(findOptions: FindOptions<TData>, populators: TPopulator[]) {
    findOptions.include = populators.map((populator) => {
      const include: IncludeOptions = {
        model: this.getRelatedModel(populator.tableName),
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

  private getRelatedModel<TTableName extends TableName>(tableName: TTableName) {
    return this.connexion.models[tableName];
  }
}
