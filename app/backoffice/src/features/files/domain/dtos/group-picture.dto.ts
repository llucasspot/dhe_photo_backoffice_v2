import { ProjectKlassDto } from '@domain/modules';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

import { PictureDto } from './picture.dto';

import { plainToInstance, Type } from '#class-transformer';
import { Dto } from '#core/domain';
import { HavePicture } from '#features/students/domain';

export class GroupPictureDto
  extends Dto<GroupPictureDto>
  implements HavePicture
{
  // properties
  id!: string;
  klassId!: string;
  // relationships
  @IsOptional()
  klass?: ProjectKlassDto;

  // HavePicture properties
  @IsString()
  pictureId!: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => PictureDto)
  picture?: PictureDto;

  static build<TBody>(body: TBody[]): GroupPictureDto[];
  static build<TBody>(body: TBody): GroupPictureDto;
  static build(body: unknown): GroupPictureDto | GroupPictureDto[] {
    return plainToInstance(this, body);
  }
}
