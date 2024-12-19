import { ProductsDaoPort } from '../ports';

import { singleton } from '#di';
import { DtoByTableName } from '#mock/domain';
import { MockDao } from '#mock/infra';

@singleton()
export class ProductsDaoArrayAdapter
  extends MockDao<DtoByTableName, 'products'>
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
