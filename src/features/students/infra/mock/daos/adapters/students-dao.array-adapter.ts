import { StudentsDaoPort } from '../ports';

import { singleton } from '#di';
import { DtoByTableName } from '#mock/domain';
import { MockDao } from '#mock/infra';

@singleton()
export class StudentsDaoArrayAdapter
  extends MockDao<DtoByTableName, 'students'>
  implements StudentsDaoPort
{
  constructor() {
    super([]);
  }
}
