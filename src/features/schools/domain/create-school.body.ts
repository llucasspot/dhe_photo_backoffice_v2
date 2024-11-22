import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

import { SchoolStatus, SchoolType } from './school.dto';

import { Dto } from '#core/domain';

export class CreateSchoolBody extends Dto<CreateSchoolBody> {
  @IsString({ message: 'schools.create.validation.name.IsString' })
  @IsNotEmpty({ message: 'schools.create.validation.name.IsNotEmpty' })
  @MaxLength(100, { message: 'schools.create.validation.name.MaxLength' })
  @Transform(({ value }) => value?.trim())
  name!: string;

  @IsString({ message: 'schools.create.validation.location.IsString' })
  @IsNotEmpty({ message: 'schools.create.validation.location.IsNotEmpty' })
  @MaxLength(100, { message: 'schools.create.validation.location.MaxLength' })
  @Transform(({ value }) => value?.trim())
  location!: string;

  @IsEnum(SchoolType, { message: 'schools.create.validation.type.IsEnum' })
  @IsNotEmpty({ message: 'schools.create.validation.type.IsNotEmpty' })
  type!: SchoolType;

  @IsEnum(SchoolStatus, { message: 'schools.create.validation.status.IsEnum' })
  @IsNotEmpty({ message: 'schools.create.validation.status.IsNotEmpty' })
  status!: SchoolStatus;

  @IsNumber({}, { message: 'schools.create.validation.studentCount.IsNumber' })
  @Min(0, { message: 'schools.create.validation.studentCount.Min' })
  @IsNotEmpty({ message: 'schools.create.validation.studentCount.IsNotEmpty' })
  studentCount!: number;
}
