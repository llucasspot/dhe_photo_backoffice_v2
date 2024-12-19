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
  CoordProductTemplatesDaoDexieAdapter,
  CoordProductTemplatesDaoPort,
  ProductsDaoDexieAdapter,
  ProductsDaoPort,
  TemplateLayersDaoDexieAdapter,
  TemplateLayersDaoPort,
  TemplatesDaoDexieAdapter,
  TemplatesDaoPort,
} from '#features/products/infra';
import {
  ProjectProductsDaoDexieAdapter,
  ProjectProductsDaoPort,
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
    // templates
    {
      token: TemplatesDaoPort,
      useToken: TemplatesDaoDexieAdapter,
    },
    {
      token: TemplateLayersDaoPort,
      useToken: TemplateLayersDaoDexieAdapter,
    },
    {
      token: CoordProductTemplatesDaoPort,
      useToken: CoordProductTemplatesDaoDexieAdapter,
    },
  ],
})
export class DatabaseDexieModule {}
