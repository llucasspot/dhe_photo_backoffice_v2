import { KlassStudentDto } from '@domain/modules';

export abstract class StudentsGetterControllerServicePort {
  abstract getStudents(): Promise<KlassStudentDto[]>;

  abstract getStudent(studentId: string): Promise<KlassStudentDto>;
}
