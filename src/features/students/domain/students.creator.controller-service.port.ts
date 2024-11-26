import { CreateStudentBody } from './create-student.body';
import { StudentDto } from './student.dto';

export abstract class StudentsCreatorControllerServicePort {
  abstract createStudent(student: CreateStudentBody): Promise<StudentDto>;

  abstract createStudents(student: CreateStudentBody[]): Promise<StudentDto[]>;
}
