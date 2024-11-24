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
  ],
})
export class StudentsModule {}
