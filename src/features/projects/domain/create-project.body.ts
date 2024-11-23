import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { Dto } from '#core/domain';

export class CreateProjectBody extends Dto<CreateProjectBody> {
  @IsString({ message: 'projects.create.validation.name.IsString' })
  @IsNotEmpty({ message: 'projects.create.validation.name.IsNotEmpty' })
  @MaxLength(100, { message: 'projects.create.validation.name.MaxLength' })
  @Transform(({ value }) => value?.trim())
  name!: string;

  @IsString({ message: 'projects.create.validation.schoolId.IsString' })
  @IsNotEmpty({ message: 'projects.create.validation.schoolId.IsNotEmpty' })
  @Transform(({ value }) => value?.trim())
  schoolId!: string;

  @IsDate({ message: 'projects.create.validation.shotDate.IsDate' })
  @IsNotEmpty({ message: 'projects.create.validation.shotDate.IsNotEmpty' })
  @Transform(({ value }) => (value ? new Date(value) : null))
  shotDate!: Date;

  @IsDate({ message: 'projects.create.validation.orderEndDate.IsDate' })
  @IsNotEmpty({ message: 'projects.create.validation.orderEndDate.IsNotEmpty' })
  @Transform(({ value }) => (value ? new Date(value) : null))
  orderEndDate!: Date;

  @IsString({
    message: 'projects.create.validation.messageForClients.IsString',
  })
  @MaxLength(500, {
    message: 'projects.create.validation.messageForClients.MaxLength',
  })
  @Transform(({ value }) => value?.trim())
  messageForClients?: string;

  // @IsEnum(ProjectState, { message: 'projects.create.validation.state.IsEnum' })
  // @IsNotEmpty({ message: 'projects.create.validation.state.IsNotEmpty' })
  // state!: ProjectState;
}
