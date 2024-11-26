import { StudentDto } from '#features/students/domain';
import { Dao } from '#mock';

export type Student = Pick<StudentDto, 'id' | 'code' | 'klassId'>;

export abstract class StudentsDaoPort extends Dao<'students'> {}
