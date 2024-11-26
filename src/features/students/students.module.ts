import { KlassStudentsServicePort } from './domain/klass-students.service.port';
import { StudentsCreatorPort } from './domain/students.creator.port';
import { StudentsGetterPort } from './domain/students.getter.port';
import { KlassStudentsServiceMockAdapter } from './infra/mock/klass-students.service.mock-adapter';
import { StudentsCreatorMockAdapter } from './infra/mock/students.creator.mock-adapter';
import { StudentsGetterPortMockAdapter } from './infra/mock/students.getter.mock-adapter';

import { Module } from '#di';
import { StudentsServicePort } from '#features/students/domain';
import {
  StudentsDaoDexieAdapter,
  StudentsDaoPort,
  StudentsServiceMockAdapter,
} from '#features/students/infra';

@Module({
  providers: [
    {
      token: StudentsServicePort,
      useToken: StudentsServiceMockAdapter,
    },
    {
      token: StudentsDaoPort,
      useToken: StudentsDaoDexieAdapter,
    },
    {
      token: KlassStudentsServicePort,
      useToken: KlassStudentsServiceMockAdapter,
    },
    {
      token: StudentsGetterPort,
      useToken: StudentsGetterPortMockAdapter,
    },
    {
      token: StudentsCreatorPort,
      useToken: StudentsCreatorMockAdapter,
    },
  ],
})
export class StudentsModule {}
