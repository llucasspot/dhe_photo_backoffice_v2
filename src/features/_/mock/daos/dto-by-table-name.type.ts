import { FileStudent } from '#features/files/infra';
import { Filee } from '#features/files/infra';
import { Klass } from '#features/klasses/infra';
import { Product } from '#features/products/infra';
import { Project } from '#features/projects/infra';
import { School } from '#features/schools/infra';
import { Student } from '#features/students/infra';

export type DtoByTableName = {
  files: Filee;
  studentFiles: FileStudent;
  schools: School;
  klasses: Klass;
  products: Product;
  projects: Project;
  students: Student;
};

export type TableName = keyof DtoByTableName;
