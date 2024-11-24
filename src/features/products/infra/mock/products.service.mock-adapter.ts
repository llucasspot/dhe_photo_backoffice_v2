import { ProductsMockDao } from './products.mock-dao';

import { MockAdapter } from '#core/domain';
import { inject, singleton } from '#di';
import {
  CreateProductBody,
  ProductDto,
  ProductsServicePort,
} from '#features/products/domain';

@singleton()
export class ProductsServiceMockAdapter
  extends MockAdapter
  implements ProductsServicePort
{
  constructor(
    @inject(ProductsMockDao)
    private readonly productsMockDao: ProductsMockDao,
  ) {
    super();
  }

  async getProducts(): Promise<ProductDto[]> {
    await this.delay();
    return this.productsMockDao.getAll();
  }

  async getProduct(id: string): Promise<ProductDto> {
    await this.delay();
    const product = this.productsMockDao.getById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async createProduct(body: CreateProductBody): Promise<ProductDto> {
    await this.delay();
    return this.productsMockDao.save({
      ...body,
    });
  }

  async updateProduct(
    id: string,
    body: Partial<ProductDto>,
  ): Promise<ProductDto> {
    await this.delay();
    const product = this.productsMockDao.update(id, body);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async deleteProduct(id: string): Promise<void> {
    await this.delay();
    const product = this.productsMockDao.deleteById(id);
    if (!product) {
      throw new Error('Product not found');
    }
  }
}
