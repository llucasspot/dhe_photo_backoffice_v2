import { OmitType } from '@domain/core';
import { Model } from '@domain/core';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { SchoolModel } from './school.model';

export class ProjectModel extends Model<ProjectModel> {
  @IsString()
  @IsNotEmpty()
  name!: string;
  @IsString()
  @IsNotEmpty()
  state!: 'published' | 'unpublished';
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  shotDate!: Date;
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  orderEndDate!: Date;
  @IsString()
  @IsOptional()
  messageForClients?: string;
}

export class SchoolProjectModel extends OmitType(ProjectModel, []) {
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  schoolId?: SchoolModel['id'];
}
