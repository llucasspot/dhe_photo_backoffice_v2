import { DtoByTableName } from '../../../../../domain';
import { DaoRunTime } from '../../../../../infra/run-time';
import { PicturesDaoPort } from '../../../domain/pictures-dao.port';

import { adapter } from '#di';

@adapter(PicturesDaoPort)
export class PicturesDaoArrayAdapter
  extends DaoRunTime<DtoByTableName, 'pictures'>
  implements PicturesDaoPort
{
  constructor() {
    super([]);
  }
}
