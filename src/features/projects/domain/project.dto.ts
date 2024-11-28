import { IsOptional } from 'class-validator';

import { Dto, OmitType } from '#core/domain';
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
  klassIds: string[] = [];
}

export class SchoolProject extends OmitType(ProjectDto, ['school']) {}
export class KlassProject extends OmitType(ProjectDto, [
  'klasses',
  'klassIds',
]) {}
