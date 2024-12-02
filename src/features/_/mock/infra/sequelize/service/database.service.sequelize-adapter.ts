import { Model, ModelStatic, Sequelize } from 'sequelize';

import { SequelizeTableName } from '../dao/dto-by-table-name.type.sequelize';

import { singleton } from '#di';
import { DatabaseServicePort, DtoByTableName, TableName } from '#mock/domain';

export type SequelizeConnexion = Sequelize & {
  [TTableName in TableName]: ModelStatic<
    Model<DtoByTableName[TTableName], Partial<DtoByTableName[TTableName]>>
  >;
};

@singleton()
export class DatabaseServiceSequelizeAdapter implements DatabaseServicePort {
  private db: SequelizeConnexion;

  constructor() {
    this.db = new Sequelize() as SequelizeConnexion;
  }

  getRelatedModel<TTableName extends SequelizeTableName>(
    tableName: TTableName,
  ) {
    return this.db.models[tableName];
  }
}
