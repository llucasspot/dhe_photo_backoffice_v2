import { IsOptional } from 'class-validator';

import { OmitType } from '#@nestjs/mapped-types';
import { plainToInstance } from '#class-transformer';
import { Dto } from '#core/domain';
import { ProjectKlassDto } from '#features/klasses/domain';
import { ProjectSchool } from '#features/schools/domain';

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

  get klassIds(): string[] {
    return this.klasses.map((klass) => klass.id);
  }

  static build<TBody>(body: TBody[]): ProjectDto[];
  static build<TBody>(body: TBody): ProjectDto;
  static build(body: unknown): ProjectDto | ProjectDto[] {
    return plainToInstance(this, body);
  }
}

export class SchoolProject extends OmitType(ProjectDto, ['school']) {}

export class KlassProject extends OmitType(ProjectDto, [
  'klasses',
  'klassIds',
]) {}
