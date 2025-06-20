import { adapter } from '@mygoodstack/di-react';

import { DtoByTableName } from '../../../../../domain';
import { DaoRunTime } from '../../../../../infra/run-time';
import { PicturesDaoPort } from '../../../domain/pictures-dao.port';

@adapter(PicturesDaoPort, Scope.Singleton, 'mock')
export class PicturesDaoArrayAdapter
  extends DaoRunTime<DtoByTableName, 'pictures'>
  implements PicturesDaoPort
{
  constructor() {
    super([]);
  }
}
