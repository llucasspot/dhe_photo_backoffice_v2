import { OmitType } from '@domain/core';

import { ProductModel, ProjectProductModel } from '../models/product.model';

export class ProductDto extends OmitType(ProductModel, []) {}

export class ProjectProductDto extends OmitType(ProjectProductModel, []) {}
