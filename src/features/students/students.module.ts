import { KlassStudentsGetterControllerServicePort } from './domain/klass-students.getter.controller-service.port.ts';
import { StudentsCreatorControllerServicePort } from './domain/students.creator.controller-service.port.ts';
import { StudentsGetterControllerServicePort } from './domain/students.getter.controller-service.port.ts';
import { KlassStudentsServiceMockAdapter } from './infra/mock/klass-students.service.mock-adapter';
import { StudentsCreatorMockAdapter } from './infra/mock/students.creator.mock-adapter';
import { StudentsGetterPortMockAdapter } from './infra/mock/students.getter.mock-adapter';

import { Module } from '#di';
import { StudentsControllerServicePort } from '#features/students/domain';
import { StudentsServiceMockAdapter } from '#features/students/infra';

@Module({
  providers: [
    {
      token: StudentsControllerServicePort,
      useToken: StudentsServiceMockAdapter,
    },
    {
      token: KlassStudentsGetterControllerServicePort,
      useToken: KlassStudentsServiceMockAdapter,
    },
    {
      token: StudentsGetterControllerServicePort,
      useToken: StudentsGetterPortMockAdapter,
    },
    {
      token: StudentsCreatorControllerServicePort,
      useToken: StudentsCreatorMockAdapter,
    },
  ],
})
export class StudentsModule {}
