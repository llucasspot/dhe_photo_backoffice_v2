import { StudentDto } from './student.dto';

export abstract class StudentsGetterControllerServicePort {
  abstract getStudents(): Promise<StudentDto[]>;

  abstract getStudent(studentId: string): Promise<StudentDto>;
}
