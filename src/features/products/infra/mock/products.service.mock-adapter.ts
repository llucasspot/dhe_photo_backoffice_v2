import { ProductsDaoPort } from './daos';

import { LogAction, MockAdapter } from '#core/domain';
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
    @inject(ProductsDaoPort)
    private readonly productsMockDao: ProductsDaoPort,
  ) {
    super();
  }

  @LogAction()
  async getProducts(): Promise<ProductDto[]> {
    await this.delay();
    return this.productsMockDao.getAll();
  }

  @LogAction()
  async getProduct(id: string): Promise<ProductDto> {
    await this.delay();
    const product = await this.productsMockDao.getById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  @LogAction()
  async createProduct(body: CreateProductBody): Promise<ProductDto> {
    await this.delay();
    return this.productsMockDao.save({
      ...body,
    });
  }

  @LogAction()
  async updateProduct(
    id: string,
    body: Partial<ProductDto>,
  ): Promise<ProductDto> {
    await this.delay();
    const product = await this.productsMockDao.update(id, body);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  @LogAction()
  async deleteProduct(id: string): Promise<void> {
    await this.delay();
    const product = this.productsMockDao.deleteById(id);
    if (!product) {
      throw new Error('Product not found');
    }
  }
}
