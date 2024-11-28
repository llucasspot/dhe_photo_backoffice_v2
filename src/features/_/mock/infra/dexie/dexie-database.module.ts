import { Module } from '#di';
import {
  FilesDaoDexieAdapter,
  FilesDaoPort,
  StudentPicturesDaoDexieAdapter,
  StudentPicturesDaoPort,
} from '#features/files/infra';
import { GroupPicturesDaoPort } from '#features/klasses/domain';
import {
  GroupPicturesDaoDexieAdapter,
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
      token: StudentPicturesDaoPort,
      useToken: StudentPicturesDaoDexieAdapter,
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
    {
      token: GroupPicturesDaoPort,
      useToken: GroupPicturesDaoDexieAdapter,
    },
  ],
})
export class DexieDatabaseModule {}
