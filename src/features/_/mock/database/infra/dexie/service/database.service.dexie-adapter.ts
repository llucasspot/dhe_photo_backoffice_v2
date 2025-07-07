import { singleton } from '@mygoodstack/di-react';
import { Type } from '@mygoodstack/di-react';
import Dexie, { EntityTable } from 'dexie';

import { DatabaseServicePort } from '../../../domain';
import {
  BankAccount,
  Customer,
  GroupPicture,
  Klass,
  Photographer,
  Picture,
  Product,
  ProductTemplates,
  Project,
  ProjectProduct,
  School,
  SchoolBankAccount,
  Student,
  StudentPicture,
  Template,
  TemplateLayer,
} from '../../../domain/dao/tables';
import {
  DexieFileData,
  DexieTableName,
  DtoByDexieTableName,
} from '../dao/dto-by-table-name.type.dexie';

import { DatabaseServiceDexieAdapterAbstract } from './database.service.dexie-adapter.abstract';

export type DexieConnexion = Dexie & {
  // @ts-expect-error dao
  [K in DexieTableName]: EntityTable<DtoByDexieTableName[K], 'id'>;
};

@singleton()
export class DatabaseServiceDexieAdapter
  extends DatabaseServiceDexieAdapterAbstract
  implements DatabaseServicePort
{
  constructor() {
    super({
      photographers: Photographer,
      pictures: Picture,
      studentPictures: StudentPicture,
      groupPictures: GroupPicture,
      klasses: Klass,
      products: Product,
      projects: Project,
      projectProducts: ProjectProduct,
      // bank accounts
      bankAccounts: BankAccount,
      // schools
      schools: School,
      schoolBankAccounts: SchoolBankAccount,
      // klasses
      students: Student,
      dexieFileData: DexieFileData,
      // couche de coordination
      coord_product_templates: ProductTemplates,
      // template
      tmplt_templates: Template,
      tmplt_layers: TemplateLayer,
      // customer
      customers: Customer,
    } as const satisfies {
      [K in DexieTableName]: Type<object>;
    });
  }
}
