import { Dto } from '#core/domain';
import { Dao } from '#mock';

export class Student extends Dto<Student> {
  id!: string;
  code!: string;
  klassId!: string;
}

export abstract class StudentsDaoPort extends Dao<'students'> {}
