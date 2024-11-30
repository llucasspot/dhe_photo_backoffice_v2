import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';

import { OmitType } from '#core/domain';
import { KlassProject } from '#features/projects/domain';
import { HavePictures } from '#features/students/domain';
import { KlassStudentDto } from '#features/students/domain';

export class KlassDto extends HavePictures<KlassDto> {
  // properties
  @IsString()
  id!: string;

  @IsString()
  name!: string;
  projectId!: string;

  // relationships
  @IsOptional()
  @ValidateNested()
  @Type(() => KlassProject)
  project?: KlassProject;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => KlassStudentDto)
  students: KlassStudentDto[] = [];
  @IsArray()
  @IsString({ each: true })
  studentIds: string[] = [];
}

export class ProjectKlassDto extends OmitType(KlassDto, ['project']) {}

export class StudentKlassDto extends OmitType(KlassDto, [
  'students',
  'studentIds',
]) {}
