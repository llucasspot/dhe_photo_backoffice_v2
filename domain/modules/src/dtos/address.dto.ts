import { OmitType } from '@domain/core';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { AddressModel, SchoolAddressModel } from '../models';

import { SchoolDto } from './school.dto';

export class AddressDto extends OmitType(AddressModel, []) {}

export class SchoolAddressDto extends OmitType(SchoolAddressModel, []) {
  @ValidateNested()
  @Type(() => SchoolDto)
  school?: SchoolDto;
}
