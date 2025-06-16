import { adapter } from '@mygoodstack/di-react/dist';

import { DtoByTableName } from '../../../../../domain';
import { DaoRunTime } from '../../../../../infra/run-time';
import { PicturesDaoPort } from '../../../domain/pictures-dao.port';

@adapter(PicturesDaoPort, 'mock')
export class PicturesDaoArrayAdapter
  extends DaoRunTime<DtoByTableName, 'pictures'>
  implements PicturesDaoPort
{
  constructor() {
    super([]);
  }
}
