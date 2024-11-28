import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

import { FileDto } from '#features/files/domain';

export class HavePicture {
  @IsString()
  fileId!: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => FileDto)
  file?: FileDto;
}
