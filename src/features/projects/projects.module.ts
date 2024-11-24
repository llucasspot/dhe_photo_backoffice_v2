import {
  KlassesDaoDexieAdapter,
  KlassesDaoPort,
  ProjectsDaoDexieAdapter,
  ProjectsDaoPort,
} from './infra/mock/daos';

import { Module } from '#di';
import { ProjectsServicePort } from '#features/projects/domain';
import { ProjectsServiceMockAdapter } from '#features/projects/infra';

@Module({
  providers: [
    {
      token: ProjectsServicePort,
      useToken: ProjectsServiceMockAdapter,
    },
    {
      token: KlassesDaoPort,
      useToken: KlassesDaoDexieAdapter,
    },
    {
      token: ProjectsDaoPort,
      useToken: ProjectsDaoDexieAdapter,
    },
  ],
})
export class ProjectsModule {}
