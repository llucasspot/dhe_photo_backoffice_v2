import { KlassStudentsServiceMockAdapter } from './infra/klass-students.service.mock-adapter';
import { StudentsCreatorMockAdapter } from './infra/students.creator.mock-adapter';
import { StudentsGetterPortMockAdapter } from './infra/students.getter.mock-adapter';
import { StudentsServiceMockAdapter } from './infra/students.service.mock-adapter';

import { Module } from '#di';
import {
  KlassStudentsGetterControllerServicePort,
  StudentsControllerServicePort,
  StudentsCreatorControllerServicePort,
  StudentsGetterControllerServicePort,
} from '#features/students/domain';

@Module({
  providers: [
    {
      token: KlassStudentsGetterControllerServicePort,
      useToken: KlassStudentsServiceMockAdapter,
    },
    {
      token: StudentsCreatorControllerServicePort,
      useToken: StudentsCreatorMockAdapter,
    },
    {
      token: StudentsGetterControllerServicePort,
      useToken: StudentsGetterPortMockAdapter,
    },
    {
      token: StudentsControllerServicePort,
      useToken: StudentsServiceMockAdapter,
    },
  ],
})
export class StudentsMockApiModule {}
