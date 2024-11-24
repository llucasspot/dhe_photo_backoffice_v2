import { Module } from '#di';
import { StudentsServicePort } from '#features/students/domain';
import { StudentsServiceMockAdapter } from '#features/students/infra';

@Module({
  providers: [
    {
      token: StudentsServicePort,
      useToken: StudentsServiceMockAdapter,
    },
  ],
})
export class StudentsModule {}
