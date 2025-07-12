import { OmitType } from '@domain/core';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';

import { ProjectModel, SchoolProjectModel } from '../models';

import { ProjectKlassDto } from './klass.dto';
import { ProjectProductDto } from './product.dto';
import { SchoolDto } from './school.dto';

export class ProjectDto extends OmitType(ProjectModel, []) {}

export class SchoolProjectDto extends OmitType(SchoolProjectModel, []) {
  @IsOptional()
  @ValidateNested()
  @Type(() => SchoolDto)
  school?: SchoolDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectProductDto)
  products?: ProjectProductDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectKlassDto)
  klasses?: ProjectKlassDto[];
}
