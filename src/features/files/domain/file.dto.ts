import { Dto } from '#core/domain';

export class FileDto extends Dto<FileDto> {
  //properties
  id!: string;
  // TODO type File
  blob!: Blob;
}
