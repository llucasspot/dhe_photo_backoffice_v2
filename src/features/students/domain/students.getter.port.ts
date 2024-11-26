import { StudentDto } from './student.dto';

export abstract class StudentsGetterPort {
  abstract getStudents(): Promise<StudentDto[]>;

  abstract getStudent(studentId: string): Promise<StudentDto>;
}
