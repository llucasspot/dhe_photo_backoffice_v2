import { Dto } from '#core/domain';

export class FileDto extends Dto<FileDto> {
  id!: string;
  file!: File;
}
