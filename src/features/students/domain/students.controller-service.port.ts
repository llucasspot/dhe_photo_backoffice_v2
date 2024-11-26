import { StudentDto } from './student.dto';

export abstract class StudentsControllerServicePort {
  abstract updateStudent(
    studentId: string,
    student: Partial<StudentDto>,
  ): Promise<StudentDto>;

  abstract deleteStudent(studentId: string): Promise<void>;
}
