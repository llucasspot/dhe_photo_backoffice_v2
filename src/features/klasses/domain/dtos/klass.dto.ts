import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';

import { OmitType } from '#@nestjs/mapped-types';
import { plainToInstance, Type } from '#class-transformer';
import { KlassProject } from '#features/projects/domain';
import { HavePictures, KlassStudentDto } from '#features/students/domain';

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
  get studentIds(): string[] {
    return this.students.map((student) => student.id);
  }

  static build<TBody>(body: TBody[]): KlassDto[];
  static build<TBody>(body: TBody): KlassDto;
  static build(body: unknown): KlassDto | KlassDto[] {
    return plainToInstance(this, body);
  }
}

export class ProjectKlassDto extends OmitType(KlassDto, ['project']) {}

export class StudentKlassDto extends OmitType(KlassDto, [
  'students',
  'studentIds',
]) {}
