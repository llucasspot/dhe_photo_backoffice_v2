import Dexie, { EntityTable } from 'dexie';

import { DatabaseServicePort } from './database.service.port';

import { singleton } from '#di';
import { StudentDto } from '#features/students/domain';

type TConnexion = Dexie & {
  students: EntityTable<StudentDto, 'id'>;
};

@singleton()
export class DatabaseServiceDexieAdapter
  implements DatabaseServicePort<TConnexion>
{
  private db: TConnexion;

  constructor() {
    const db = new Dexie('MyDatabase') as TConnexion;
    db.version(1).stores({
      students: '++id, code, photoIds, klassId',
    });
    this.db = db;
  }

  getConnexion() {
    return this.db;
  }
}
