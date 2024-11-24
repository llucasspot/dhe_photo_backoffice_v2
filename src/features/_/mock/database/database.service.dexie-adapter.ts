import Dexie, { EntityTable } from 'dexie';
import { v4 as uuidv4 } from 'uuid';

import { DatabaseServicePort } from './database.service.port';

import { singleton } from '#di';
import { ProductDto } from '#features/products/domain';
import { KlassDto, ProjectDto } from '#features/projects/domain';
import { SchoolDto } from '#features/schools/domain';
import { FileDto, StudentDto } from '#features/students/domain';

type TConnexion = Dexie & {
  students: EntityTable<StudentDto, 'id'>;
  files: EntityTable<FileDto, 'id'>;
  klasses: EntityTable<KlassDto, 'id'>;
  projects: EntityTable<ProjectDto, 'id'>;
  products: EntityTable<ProductDto, 'id'>;
  schools: EntityTable<SchoolDto, 'id'>;
};

@singleton()
export class DatabaseServiceDexieAdapter
  implements DatabaseServicePort<TConnexion>
{
  private db: TConnexion;

  constructor() {
    const db: TConnexion = new Dexie('MyDatabase') as TConnexion;

    db.version(1).stores({
      students: 'id, code, photoIds, klassId',
      files: 'id, file',
      klasses: 'id, name, projectId',
      projects:
        'id, name, schoolId, orderEndDate, shotDate, messageForClients, state',
      products: 'id, name, description, longSize, shortSize',
      schools: 'id, name, currency, city',
    });
    db.tables.forEach((table) => {
      table.hook('creating', (_primaryKey, obj) => {
        console.log('obj : ', obj);
        if (!obj.id) {
          obj.id = uuidv4(); // Generate a UUID if no ID is provided
        }
      });
    });
    this.db = db;
  }

  getConnexion() {
    return this.db;
  }
}
