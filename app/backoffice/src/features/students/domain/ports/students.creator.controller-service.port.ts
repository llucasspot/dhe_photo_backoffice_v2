import { KlassStudentDto } from '@domain/modules';

import { CreateStudentBody } from '../dtos/bodies/create-student.body';

export abstract class StudentsCreatorControllerServicePort {
  abstract createStudent(student: CreateStudentBody): Promise<KlassStudentDto>;

  abstract createStudents(
    student: CreateStudentBody[],
  ): Promise<KlassStudentDto[]>;
}
