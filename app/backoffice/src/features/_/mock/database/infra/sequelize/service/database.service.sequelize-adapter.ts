import { Model, ModelStatic, Sequelize } from 'sequelize';
import {
  DatabaseServicePort,
  DtoByTableName,
  TableName,
} from 'src/features/_/mock/database/domain';

import { SequelizeTableName } from '../dao/dto-by-table-name.type.sequelize';

export type SequelizeConnexion = Sequelize & {
  [TTableName in TableName]: ModelStatic<
    Model<DtoByTableName[TTableName], Partial<DtoByTableName[TTableName]>>
  >;
};

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
