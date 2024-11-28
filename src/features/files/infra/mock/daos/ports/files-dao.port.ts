import { Dto } from '#core/domain';
import { Dao } from '#mock';

export class Filee extends Dto<Filee> {
  //properties
  id!: string;
  // TODO type File
  blob!: Blob;
}

export abstract class FilesDaoPort extends Dao<'files'> {}
