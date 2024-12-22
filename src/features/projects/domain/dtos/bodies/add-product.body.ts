import { IsNumber, IsString, Min } from 'class-validator';

import { Type } from '#class-transformer';
import { Dto } from '#core/domain';

export class AddProductBody extends Dto<AddProductBody> {
  @IsString()
  projectId!: string;

  @IsString()
  productId!: string;

  @IsNumber()
  @Min(0, { message: 'projects.products.validation.price.Min' })
  @Type(() => Number)
  price!: number;
}
