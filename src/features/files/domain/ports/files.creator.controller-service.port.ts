import { PictureDto } from '../dtos/picture.dto';

export abstract class FilesCreatorControllerServicePort {
  abstract createFile(body: File): Promise<PictureDto>;
  abstract createFiles(body: File[]): Promise<PictureDto[]>;
}
