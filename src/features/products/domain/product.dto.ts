import { Dto } from '#core/domain';

export class ProductDto extends Dto<ProductDto> {
  id!: string;
  name!: string;
  description!: string;
  longSize!: number;
  shortSize!: number;
}
