import { Model, ModelStatic, Sequelize } from 'sequelize';

import { singleton } from '#di';
import { DatabaseServicePort, DtoByTableName, TableName } from '#mock/domain';

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