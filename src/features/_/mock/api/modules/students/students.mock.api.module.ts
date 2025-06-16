import { Module } from '@mygoodstack/di-react';

import { KlassStudentsServiceMockAdapter } from './infra/klass-students.service.mock-adapter';
import { StudentsCreatorMockAdapter } from './infra/students.creator.mock-adapter';
import { StudentsGetterPortMockAdapter } from './infra/students.getter.mock-adapter';
import { StudentsServiceMockAdapter } from './infra/students.service.mock-adapter';

@Module({
  providers: [
    KlassStudentsServiceMockAdapter,
    StudentsCreatorMockAdapter,
    StudentsGetterPortMockAdapter,
    StudentsServiceMockAdapter,
  ],
})
export class StudentsMockApiModule {}
