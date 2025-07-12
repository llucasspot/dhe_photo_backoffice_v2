import { KlassStudentDto } from '@domain/modules';

export abstract class KlassStudentsGetterControllerServicePort {
  abstract getStudents(klassId: string): Promise<KlassStudentDto[]>;

  abstract getStudent(
    klassId: string,
    studentId: string,
  ): Promise<KlassStudentDto | undefined>;
}
