import { KlassStudentDto } from '@domain/modules';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

import { PictureDto } from './picture.dto';

import { plainToInstance, Type } from '#class-transformer';
import { Dto } from '#core/domain';
import { HavePicture } from '#features/students/domain';

export class StudentPictureDto
  extends Dto<StudentPictureDto>
  implements HavePicture
{
  // properties
  id!: string;
  studentId!: string;
  // relationships
  @IsOptional()
  student?: KlassStudentDto;

  // HavePicture properties
  @IsString()
  pictureId!: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => PictureDto)
  picture?: PictureDto;

  static build<TBody>(body: TBody[]): StudentPictureDto[];
  static build<TBody>(body: TBody): StudentPictureDto;
  static build(body: unknown): StudentPictureDto | StudentPictureDto[] {
    return plainToInstance(this, body);
  }
}
