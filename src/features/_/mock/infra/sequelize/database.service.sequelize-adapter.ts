import { Model, ModelStatic, Sequelize } from 'sequelize';

import { DtoByTableName, TableName } from '../../daos';
import { DatabaseServicePort } from '../../database';

import { singleton } from '#di';

export type SequelizeConnexion = Sequelize & {
  [TTableName in TableName]: ModelStatic<
    Model<DtoByTableName[TTableName], Partial<DtoByTableName[TTableName]>>
  >;
};

@singleton()
export class DatabaseServiceSequelizeAdapter
  implements DatabaseServicePort<SequelizeConnexion>
{
  private db: SequelizeConnexion;

  constructor() {
    this.db = new Sequelize() as SequelizeConnexion;
  }

  getConnexion() {
    return this.db;
  }
}
