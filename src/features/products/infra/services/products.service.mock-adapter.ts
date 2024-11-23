import { MockAdapter } from '#core/domain';
import { singleton } from '#di';
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
  private products: ProductDto[] = [
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
  ];

  async getProducts(): Promise<ProductDto[]> {
    await this.delay(1);
    return [...this.products];
  }

  async getProduct(id: string): Promise<ProductDto> {
    await this.delay(1);
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return { ...product };
  }

  async createProduct(product: CreateProductBody): Promise<ProductDto> {
    await this.delay(1);
    const newProduct = {
      ...product,
      id: (this.products.length + 1).toString(),
    };
    this.products.push(newProduct);
    return { ...newProduct };
  }

  async updateProduct(
    id: string,
    productUpdate: Partial<ProductDto>,
  ): Promise<ProductDto> {
    await this.delay(1);
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    const updatedProduct = {
      ...this.products[index],
      ...productUpdate,
    };
    this.products[index] = updatedProduct;
    return { ...updatedProduct };
  }

  async deleteProduct(id: string): Promise<void> {
    await this.delay(1);
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    this.products.splice(index, 1);
  }
}
