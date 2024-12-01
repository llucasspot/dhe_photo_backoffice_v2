import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

import { plainToInstance } from '#class-transformer';
import { Dto } from '#core/domain';

export class ProductDto extends Dto<ProductDto> {
  id!: string;
  name!: string;
  description!: string;
  @IsNumber()
  @Type(() => Number)
  longSize!: number;
  @IsNumber()
  @Type(() => Number)
  shortSize!: number;

  static build<TBody>(body: TBody[]): ProductDto[];
  static build<TBody>(body: TBody): ProductDto;
  static build(body: unknown): ProductDto | ProductDto[] {
    return plainToInstance(this, body);
  }
}
