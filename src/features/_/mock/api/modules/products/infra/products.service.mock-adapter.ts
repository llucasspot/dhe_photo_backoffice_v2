import { adapter, inject } from '@mygoodstack/di-react/dist';

import { ProductsDaoPort } from '../../../../database/modules/products/domain/products-dao.port';
import { CoordProductTemplatesDaoPort } from '../../../../database/modules/templates/domain/coord-product-templates-dao.port';
import { TemplateLayersDaoPort } from '../../../../database/modules/templates/domain/template-layers-dao.port';
import { TemplatesDaoPort } from '../../../../database/modules/templates/domain/templates-dao.port';
import { ForMockControllerService } from '../../../domain/for-mock-controller-service';
import { HttpError } from '../../../domain/http-error';

import { LogAction } from '#core/domain';
import {
  CreateProductBody,
  ProductDto,
  ProductsControllerServicePort,
} from '#features/products/domain';

@adapter(ProductsControllerServicePort, 'mock')
export class ProductsServiceMockAdapter
  extends ForMockControllerService
  implements ProductsControllerServicePort
{
  constructor(
    @inject(ProductsDaoPort)
    private readonly productsDaoPort: ProductsDaoPort,
    @inject(TemplatesDaoPort)
    private readonly templatesDaoPort: TemplatesDaoPort,
    @inject(TemplateLayersDaoPort)
    private readonly templateLayersDaoPort: TemplateLayersDaoPort,
    @inject(CoordProductTemplatesDaoPort)
    private readonly coordProductTemplatesDaoPort: CoordProductTemplatesDaoPort,
  ) {
    super();
  }

  @LogAction()
  async getProducts(): Promise<ProductDto[]> {
    await this.delay();
    const products = await this.productsDaoPort.getAll();
    return ProductDto.buildMany(
      products.map((product) => {
        return {
          ...product,
          // TODO
          pictureFormatName: '18x24',
          mediaTypeName: 'paper',
        };
      }),
    );
  }

  @LogAction()
  async getProduct(id: string): Promise<ProductDto> {
    await this.delay();
    const product = await this.productsDaoPort.getById(id);
    if (!product) {
      throw new HttpError(404, 'Product not found');
    }
    return ProductDto.build({
      ...product,
      // TODO
      pictureFormatName: '18x24',
      mediaTypeName: 'paper',
    });
  }

  @LogAction()
  async createProduct({
    template: { layers: createTemplateLayerBodies, canvas: createTemplateBody },
    ...body
  }: CreateProductBody): Promise<ProductDto> {
    await this.delay();
    const template = await this.templatesDaoPort.save(createTemplateBody);
    await this.templateLayersDaoPort.saveMany(
      createTemplateLayerBodies.map((createTemplateLayerBody) => {
        return {
          templateId: template.id,
          ...createTemplateLayerBody,
        };
      }),
    );
    const product = await this.productsDaoPort.save({
      ...body,
    });
    await this.coordProductTemplatesDaoPort.save({
      productId: product.id,
      templateId: template.id,
    });
    return ProductDto.build({
      ...product,
      // TODO
      pictureFormatName: '18x24',
      mediaTypeName: 'paper',
    });
  }

  @LogAction()
  async updateProduct(
    id: string,
    body: Partial<ProductDto>,
  ): Promise<ProductDto> {
    await this.delay();
    const product = await this.productsDaoPort.update(id, body);
    if (!product) {
      throw new HttpError(404, 'Product not found');
    }
    return ProductDto.build({
      ...product,
      // TODO
      pictureFormatName: '18x24',
      mediaTypeName: 'paper',
    });
  }

  @LogAction()
  async deleteProduct(id: string): Promise<void> {
    await this.delay();
    const product = this.productsDaoPort.deleteById(id);
    if (!product) {
      throw new HttpError(404, 'Product not found');
    }
  }
}
