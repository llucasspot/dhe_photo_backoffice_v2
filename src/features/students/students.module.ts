import { Module } from '#di';
import { StudentsServicePort } from '#features/students/domain';
import {
  FilesDaoDexieAdapter,
  FilesDaoPort,
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
      token: FilesDaoPort,
      useToken: FilesDaoDexieAdapter,
    },
  ],
})
export class StudentsModule {}
