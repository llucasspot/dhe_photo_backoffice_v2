import { Module } from '#di';
import {
  PicturesDaoDexieAdapter,
  PicturesDaoPort,
  StudentPicturesDaoDexieAdapter,
  StudentPicturesDaoPort,
} from '#features/files/infra';
import {
  GroupPicturesDaoDexieAdapter,
  GroupPicturesDaoPort,
  KlassesDaoDexieAdapter,
  KlassesDaoPort,
} from '#features/klasses/infra';
import {
  ProductsDaoDexieAdapter,
  ProductsDaoPort,
} from '#features/products/infra';
import { ProjectProductsDaoDexieAdapter } from '#features/projects/infra';
import { ProjectProductsDaoPort } from '#features/projects/infra';
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
      token: PicturesDaoPort,
      useToken: PicturesDaoDexieAdapter,
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
    {
      token: ProjectProductsDaoPort,
      useToken: ProjectProductsDaoDexieAdapter,
    },
  ],
})
export class DatabaseDexieModule {}
