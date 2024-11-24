import { FileDto } from './file.dto.ts';

export abstract class FilesServicePort {
  abstract createFiles(body: File[]): Promise<Omit<FileDto, ''>[]>;
}
