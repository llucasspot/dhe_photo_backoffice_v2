import { StudentsDaoPort } from '../ports';

import { singleton } from '#di';
import { MockDao } from '#mock';

@singleton()
export class StudentsDaoArrayAdapter
  extends MockDao<'students'>
  implements StudentsDaoPort
{
  constructor() {
    super([]);
  }
}
