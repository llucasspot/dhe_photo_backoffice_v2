import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { ProjectState } from './project.dto.ts';

import { Dto } from '#core/domain';

export class CreateProjectBody extends Dto<CreateProjectBody> {
  @IsString({ message: 'projects.create.validation.name.IsString' })
  @IsNotEmpty({ message: 'projects.create.validation.name.IsNotEmpty' })
  @MaxLength(100, { message: 'projects.create.validation.name.MaxLength' })
  @Transform(({ value }) => value?.trim())
  name!: string;

  @IsString({ message: 'projects.create.validation.schoolName.IsString' })
  @IsNotEmpty({ message: 'projects.create.validation.schoolName.IsNotEmpty' })
  @MaxLength(100, {
    message: 'projects.create.validation.schoolName.MaxLength',
  })
  @Transform(({ value }) => value?.trim())
  schoolName!: string;

  @IsString({ message: 'projects.create.validation.lieu.IsString' })
  @IsNotEmpty({ message: 'projects.create.validation.lieu.IsNotEmpty' })
  @MaxLength(100, { message: 'projects.create.validation.lieu.MaxLength' })
  @Transform(({ value }) => value?.trim())
  lieu!: string;

  @IsEnum(ProjectState, { message: 'projects.create.validation.state.IsEnum' })
  @IsNotEmpty({ message: 'projects.create.validation.state.IsNotEmpty' })
  state!: ProjectState;
}
