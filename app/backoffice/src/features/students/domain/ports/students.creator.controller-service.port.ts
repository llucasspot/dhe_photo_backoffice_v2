import { CreateStudentBody } from '../dtos/bodies/create-student.body';
import { StudentDto } from '../dtos/student.dto';

export abstract class StudentsCreatorControllerServicePort {
  abstract createStudent(student: CreateStudentBody): Promise<StudentDto>;

  abstract createStudents(student: CreateStudentBody[]): Promise<StudentDto[]>;
}
