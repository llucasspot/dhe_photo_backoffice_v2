import Dexie, { EntityTable } from 'dexie';
import { v4 as uuidv4 } from 'uuid';

import { DtoByTableName } from '../daos';

import { DatabaseServicePort } from './database.service.port';

import { singleton } from '#di';

export type DexieEntityTable = {
  files: EntityTable<DtoByTableName['files'], 'id'>;
  studentFiles: EntityTable<DtoByTableName['studentFiles'], 'id'>;
  schools: EntityTable<DtoByTableName['schools'], 'id'>;
  klasses: EntityTable<DtoByTableName['klasses'], 'id'>;
  products: EntityTable<DtoByTableName['products'], 'id'>;
  projects: EntityTable<DtoByTableName['projects'], 'id'>;
  students: EntityTable<DtoByTableName['students'], 'id'>;
};

export type DexieConnexion = Dexie & DexieEntityTable;

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
