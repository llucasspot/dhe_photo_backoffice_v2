import { FileDto } from './file.dto';

export abstract class FilesServicePort {
  abstract createFile(body: File): Promise<Omit<FileDto, ''>>;
  abstract createFiles(body: File[]): Promise<Omit<FileDto, ''>[]>;
}
