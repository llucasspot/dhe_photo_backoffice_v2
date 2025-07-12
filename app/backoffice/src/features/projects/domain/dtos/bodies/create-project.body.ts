import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { Transform } from '#class-transformer';
import { Dto } from '#core/domain';

export class CreateProjectBody extends Dto<CreateProjectBody> {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @Transform(({ value }) => value?.trim())
  name!: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  schoolId!: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  // @Transform(({ value }) => (value ? new Date(value) : null))
  shotDate!: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  // @Transform(({ value }) => (value ? new Date(value) : null))
  orderEndDate!: Date;

  @IsString()
  @MaxLength(500)
  @Transform(({ value }) => value?.trim())
  messageForClients?: string;

  // @IsEnum(ProjectState, { message: 'projects.create.validation.state.IsEnum' })
  // @IsNotEmpty({ message: 'projects.create.validation.state.IsNotEmpty' })
  // state!: ProjectState;
}
