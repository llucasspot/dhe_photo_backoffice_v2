import { Model } from '@domain/core';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

import { AvailableMediaTypeName, availableMediaTypes } from './media-types';
import {
  AvailablePictureFormatName,
  availablePictureFormats,
} from './picture-formats';
import { ProjectModel } from './project.model';

export class ProductModel extends Model<ProductModel> {
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsEnum(Object.keys(availableMediaTypes))
  mediaTypeName!: AvailableMediaTypeName;

  @IsEnum(Object.keys(availablePictureFormats))
  pictureFormatName!: AvailablePictureFormatName;

  @Min(0)
  @IsNumber()
  @Type(() => Number)
  price!: number;
}

export class ProjectProductModel extends ProductModel {
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  projectId?: ProjectModel['id'];
}
