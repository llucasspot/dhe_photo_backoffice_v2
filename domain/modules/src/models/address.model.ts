import { OmitType } from '@domain/core';
import { Model } from '@domain/core';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { SchoolModel } from './school.model';

export class AddressModel extends Model<AddressModel> {
  @IsString()
  @IsNotEmpty()
  number!: string;
  @IsString()
  @IsNotEmpty()
  street!: string;
  @IsString()
  @IsNotEmpty()
  complement?: string;
  @IsString()
  @IsNotEmpty()
  city!: string;
  @IsString()
  @IsNotEmpty()
  state!: string;
  @IsString()
  @IsNotEmpty()
  postalCode!: string;
  @IsString()
  @IsNotEmpty()
  country!: string;
}

export class SchoolAddressModel extends OmitType(AddressModel, []) {
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  schoolId!: SchoolModel['id'];
}
