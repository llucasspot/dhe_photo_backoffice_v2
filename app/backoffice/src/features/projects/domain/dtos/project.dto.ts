import { SchoolDto } from '@domain/schools';
import { IsOptional } from 'class-validator';

import { ProjectProductDto } from './project-product.dto';

import { OmitType } from '@domain/core';
import { plainToInstance } from '#class-transformer';
import { Dto } from '#core/domain';
import { ProjectKlassDto } from '#features/klasses/domain';

export enum ProjectState {
  Published = 'published',
  Unpublished = 'unpublished',
}

export class ProjectDto extends Dto<ProjectDto> {
  // properties
  id!: string;
  schoolId!: string;
  name!: string;
  shotDate!: Date;
  orderEndDate!: Date;
  @IsOptional()
  messageForClients?: string;
  state!: ProjectState;
  // relationships
  @IsOptional()
  school?: ProjectSchool;
  klasses: ProjectKlassDto[] = [];
  products: ProjectProductDto[] = [];

  get klassIds(): string[] {
    return this.klasses.map((klass) => klass.id);
  }

  get productIds(): string[] {
    return this.products.map((product) => product.id);
  }

  static build<TBody>(body: TBody[]): ProjectDto[];
  static build<TBody>(body: TBody): ProjectDto;
  static build(body: unknown): ProjectDto | ProjectDto[] {
    return plainToInstance(this, body);
  }
}

export class ProjectSchool extends OmitType(SchoolDto, ['projects']) {}

export class SchoolProject extends OmitType(ProjectDto, ['school']) {}

export class KlassProject extends OmitType(ProjectDto, [
  'klasses',
  'klassIds',
]) {}
