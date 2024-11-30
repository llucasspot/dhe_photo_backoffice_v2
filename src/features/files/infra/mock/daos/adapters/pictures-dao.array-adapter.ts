import { PicturesDaoPort } from '../ports';

import { singleton } from '#di';
import { DtoByTableName } from '#mock/domain';
import { MockDao } from '#mock/infra';

@singleton()
export class PicturesDaoArrayAdapter
  extends MockDao<DtoByTableName, 'pictures'>
  implements PicturesDaoPort
{
  constructor() {
    super([]);
  }
}
