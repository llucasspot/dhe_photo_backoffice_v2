import { plainToInstance, Transform, Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';

import { ProjectKlassModel } from '../models/klass.model';
import { KlassPictureModel } from '../models/picture.model';

import { SchoolProjectDto } from './project.dto';
import { KlassStudentDto } from './student.dto';

export class ProjectKlassDto extends ProjectKlassModel {
  @IsOptional()
  @ValidateNested()
  @Type(() => SchoolProjectDto)
  project?: SchoolProjectDto;

  @IsArray()
  @IsOptional({ each: true })
  @ValidateNested({ each: true })
  @Type(() => KlassStudentDto)
  students?: KlassStudentDto[];

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
