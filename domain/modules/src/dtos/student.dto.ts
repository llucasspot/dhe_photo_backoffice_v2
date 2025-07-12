import { OmitType } from '@domain/core';
import { plainToInstance, Transform, Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';

import { KlassPictureModel, KlassStudentModel } from '../models';

import { ProjectKlassDto } from './klass.dto';

export class KlassStudentDto extends OmitType(KlassStudentModel, []) {
  @IsOptional()
  @ValidateNested()
  @Type(() => ProjectKlassDto)
  klass?: ProjectKlassDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Transform(
    ({ value: values }: { value: { picture: KlassPictureModel }[] }) => {
      return values.map((value) =>
        plainToInstance(KlassPictureModel, value.picture),
      );
    },
  )
  @Type(() => KlassPictureModel)
  photos?: KlassPictureModel[];
}
