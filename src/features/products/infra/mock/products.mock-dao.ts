import { singleton } from '#di';
import { ProductDto } from '#features/products/domain';
import { MockDao } from '#mock';

@singleton()
export class ProductsMockDao extends MockDao<Omit<ProductDto, ''>> {
  constructor() {
    super([
      {
        id: '1',
        name: '18x24 Multi Individuel (12.00.00.00)',
        description: '12.00.00.00',
        longSize: 242,
        shortSize: 178,
      },
      {
        id: '2',
        name: '20x30 Portrait Classic (15.00.00.00)',
        description: '15.00.00.00',
        longSize: 300,
        shortSize: 200,
      },
    ]);
  }
}
