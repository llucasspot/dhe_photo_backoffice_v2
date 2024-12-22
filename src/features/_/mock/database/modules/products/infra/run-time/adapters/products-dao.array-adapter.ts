import { DtoByTableName } from '../../../../../domain';
import { DaoRunTime } from '../../../../../infra/run-time';
import { ProductsDaoPort } from '../../../domain/products-dao.port';

import { singleton } from '#di';

@singleton()
export class ProductsDaoArrayAdapter
  extends DaoRunTime<DtoByTableName, 'products'>
  implements ProductsDaoPort
{
  constructor() {
    super([
      {
        id: '1',
        name: '18x24 Multi Individuel (12.00.00.00)',
        description: '12.00.00.00',
      },
      {
        id: '2',
        name: '20x30 Portrait Classic (15.00.00.00)',
        description: '15.00.00.00',
      },
    ]);
  }
}
