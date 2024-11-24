import { CreateStudentBody } from './create-student.body';
import { StudentDto } from './student.dto';

export abstract class StudentsServicePort {
  abstract getStudents(schoolId: string): Promise<StudentDto[]>;

  abstract getStudent(id: string): Promise<StudentDto>;

  abstract createStudent(student: CreateStudentBody): Promise<StudentDto>;

  abstract createStudents(student: CreateStudentBody[]): Promise<StudentDto[]>;

  abstract updateStudent(
    id: string,
    student: Partial<StudentDto>,
  ): Promise<StudentDto>;

  abstract deleteStudent(id: string): Promise<void>;

  abstract uploadPhotos(files: File[]): Promise<string[]>;
}
