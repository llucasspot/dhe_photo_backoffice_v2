import { StudentDto } from '#features/students/domain';
import { Dao } from '#mock';

export abstract class StudentsDaoPort extends Dao<Omit<StudentDto, ''>> {}
