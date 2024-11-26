import { Module } from '#di';
import {
  FilesDaoDexieAdapter,
  FilesDaoPort,
  FileStudentsDaoDexieAdapter,
  FileStudentsDaoPort,
} from '#features/files/infra';
import {
  KlassesDaoDexieAdapter,
  KlassesDaoPort,
} from '#features/klasses/infra';
import {
  ProductsDaoDexieAdapter,
  ProductsDaoPort,
} from '#features/products/infra';
import {
  ProjectsDaoDexieAdapter,
  ProjectsDaoPort,
} from '#features/projects/infra';
import {
  SchoolsDaoDexieAdapter,
  SchoolsDaoPort,
} from '#features/schools/infra';
import {
  StudentsDaoDexieAdapter,
  StudentsDaoPort,
} from '#features/students/infra';

@Module({
  providers: [
    {
      token: ProductsDaoPort,
      useToken: ProductsDaoDexieAdapter,
    },
    {
      token: SchoolsDaoPort,
      useToken: SchoolsDaoDexieAdapter,
    },
    {
      token: FilesDaoPort,
      useToken: FilesDaoDexieAdapter,
    },
    {
      token: FileStudentsDaoPort,
      useToken: FileStudentsDaoDexieAdapter,
    },
    {
      token: KlassesDaoPort,
      useToken: KlassesDaoDexieAdapter,
    },
    {
      token: StudentsDaoPort,
      useToken: StudentsDaoDexieAdapter,
    },
    {
      token: ProjectsDaoPort,
      useToken: ProjectsDaoDexieAdapter,
    },
  ],
})
export class DexieDatabaseModule {}
