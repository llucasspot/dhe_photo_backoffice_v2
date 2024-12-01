import {
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

import { plainToInstance, Type } from '#class-transformer';
import { Dto } from '#core/domain';
import { ProductDto } from '#features/products/domain';

export class ProjectProductDto extends Dto<ProjectProductDto> {
  // properties
  @IsString()
  id!: string;

  @IsString()
  projectId!: string;

  @IsString()
  productId!: string;

  @Min(0)
  @IsNumber()
  @Type(() => Number)
  price!: number;

  // relationships
  @IsOptional()
  @ValidateNested()
  @Type(() => ProductDto)
  product?: ProductDto;

  static build<TBody>(body: TBody[]): ProjectProductDto[];
  static build<TBody>(body: TBody): ProjectProductDto;
  static build(body: unknown): ProjectProductDto | ProjectProductDto[] {
    return plainToInstance(this, body);
  }
}
