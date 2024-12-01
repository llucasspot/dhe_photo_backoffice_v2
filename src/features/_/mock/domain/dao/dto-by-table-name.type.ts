import {
  GroupPicture,
  Klass,
  Picture,
  Product,
  Project,
  School,
  Student,
  StudentPicture,
} from './tables';

import { Type } from '#di/domain';

export const dtoByTableName = {
  pictures: Picture,
  studentPictures: StudentPicture,
  groupPictures: GroupPicture,
  schools: School,
  klasses: Klass,
  products: Product,
  projects: Project,
  students: Student,
} as const satisfies {
  [K in string]: Type<{ id: string }>;
};

export type DtoByTableName = {
  pictures: Picture;
  studentPictures: StudentPicture;
  groupPictures: GroupPicture;
  schools: School;
  klasses: Klass;
  products: Product;
  projects: Project;
  students: Student;
};

export type TableName = keyof DtoByTableName;
