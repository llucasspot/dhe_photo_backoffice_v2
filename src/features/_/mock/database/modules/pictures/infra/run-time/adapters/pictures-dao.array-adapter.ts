import { DtoByTableName } from '../../../../../domain';
import { DaoRunTime } from '../../../../../infra/run-time';
import { PicturesDaoPort } from '../../../domain/pictures-dao.port';

import { singleton } from '#di';

@singleton()
export class PicturesDaoArrayAdapter
  extends DaoRunTime<DtoByTableName, 'pictures'>
  implements PicturesDaoPort
{
  constructor() {
    super([]);
  }
}
