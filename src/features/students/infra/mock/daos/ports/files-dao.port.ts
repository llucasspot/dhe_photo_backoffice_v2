import { FileDto } from '#features/students/domain';
import { Dao } from '#mock';

export abstract class FilesDaoPort extends Dao<Omit<FileDto, ''>> {}
