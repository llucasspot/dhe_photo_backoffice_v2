import { FileDto } from '#features/files/domain';
import { Dao } from '#mock';

export type Filee = Pick<FileDto, 'id' | 'file'>;

export abstract class FilesDaoPort extends Dao<'files'> {}
