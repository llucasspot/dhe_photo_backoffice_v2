import { FileDto } from './file.dto';

export abstract class FilesCreatorControllerServicePort {
  abstract createFile(body: File): Promise<Omit<FileDto, ''>>;
  abstract createFiles(body: File[]): Promise<Omit<FileDto, ''>[]>;
}
