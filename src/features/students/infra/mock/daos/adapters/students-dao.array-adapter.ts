import { StudentsDaoPort } from '../ports';

import { singleton } from '#di';
import { StudentDto } from '#features/students/domain';
import { MockDao } from '#mock';

@singleton()
export class StudentsDaoArrayAdapter
  extends MockDao<Omit<StudentDto, ''>>
  implements StudentsDaoPort
{
  constructor() {
    super([]);
  }
}
