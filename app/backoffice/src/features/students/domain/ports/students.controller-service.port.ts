import { KlassStudentDto } from '@domain/modules';

export abstract class StudentsControllerServicePort {
  abstract updateStudent(
    studentId: string,
    student: Partial<KlassStudentDto>,
  ): Promise<KlassStudentDto>;

  abstract deleteStudent(studentId: string): Promise<void>;
}
