import { IsOptional } from 'class-validator';

import { HavePictures } from './beans';

import { OmitType } from '#@nestjs/mapped-types';
import { Expose, plainToInstance } from '#class-transformer';
import { StudentKlassDto } from '#features/klasses/domain';

export class StudentDto extends HavePictures<StudentDto> {
  // properties
  id!: string;
  code!: string;
  @Expose()
  klassId!: string;
  // relationships
  @IsOptional()
  klass?: StudentKlassDto;

  static build<TBody>(body: TBody[]): StudentDto[];
  static build<TBody>(body: TBody): StudentDto;
  static build(body: unknown): StudentDto | StudentDto[] {
    return plainToInstance(this, body);
  }
}

export class KlassStudentDto extends OmitType(StudentDto, ['klass']) {}
