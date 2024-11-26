import Dexie, { EntityTable } from 'dexie';
import { v4 as uuidv4 } from 'uuid';

import { DtoByTableName, TableName } from '../../daos';
import { DatabaseServicePort } from '../../database';

import { singleton } from '#di';

export type DexieConnexion = Dexie & {
  [K in TableName]: EntityTable<DtoByTableName[K], 'id'>;
};

@singleton()
export class DatabaseServiceDexieAdapter
  implements DatabaseServicePort<DexieConnexion>
{
  private db: DexieConnexion;

  constructor() {
    const db: DexieConnexion = new Dexie('MyDatabase') as DexieConnexion;

    db.version(1).stores({
      files: 'id, file',
      studentFiles: 'id, fileId, studentId',
      klasses: 'id, projectId, name',
      products: 'id, name, description, longSize, shortSize',
      projects:
        'id, schoolId, name, orderEndDate, shotDate, messageForClients, state',
      schools: 'id, name, currency, city',
      students: 'id, klassId, code',
    });
    db.tables.forEach((table) => {
      table.hook('creating', (_primaryKey, obj) => {
        if (!obj.id) {
          obj.id = uuidv4();
        }
      });
    });
    this.db = db;
  }

  getConnexion() {
    return this.db;
  }
}
