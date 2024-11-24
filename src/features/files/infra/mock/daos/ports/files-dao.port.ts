import { FileDto } from '#features/files/domain';
import { Dao } from '#mock';

export abstract class FilesDaoPort extends Dao<Omit<FileDto, ''>> {}
