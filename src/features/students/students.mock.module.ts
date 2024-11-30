import {
  KlassStudentsServiceMockAdapter,
  StudentsCreatorMockAdapter,
  StudentsGetterPortMockAdapter,
  StudentsServiceMockAdapter,
} from './infra';

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
export class StudentsMockModule {}
