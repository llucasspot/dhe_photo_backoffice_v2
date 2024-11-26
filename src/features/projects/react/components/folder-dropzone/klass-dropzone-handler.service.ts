import { FileRejection } from 'react-dropzone';

import { ForDropzone } from './for-dropzone.ts';

import { inject, singleton } from '#di';
import { KlassesControllerServicePort } from '#features/klasses/domain';

@singleton()
export class KlassDropzoneHandlerService
  implements
    ForDropzone<{
      projectId: string;
    }>
{
  constructor(
    @inject(KlassesControllerServicePort)
    private readonly klassesControllerService: KlassesControllerServicePort,
  ) {}

  async onDrop({
    projectId,
    acceptedFiles,
    rejectedFiles,
  }: {
    projectId: string;
    acceptedFiles: File[];
    rejectedFiles: FileRejection[];
  }) {
    console.log('acceptedItems : ', acceptedFiles);
    console.log('rejectedItems : ', rejectedFiles);

    const folders = acceptedFiles.map((file) => {
      const path = this.getFilePath(file);
      const parts = path.split('/');
      const [, subFolderName, fileName] = parts;
      return { subFolderName, fileName, file };
    });
    if (folders.length <= 0) {
      return;
    }
    await this.klassesControllerService.createKlassesFromFolders({
      projectId,
      klasses: folders.map((folder) => {
        return {
          name: folder.subFolderName,
          studentPicture: {
            fileName: folder.fileName,
            file: folder.file,
          },
        };
      }),
    });
  }

  fileValidator(file: File | DataTransferItem): {
    code: string;
    message: string;
  } | null {
    if (!(file instanceof File)) {
      return {
        code: 'not-file',
        message: `File is not a file`,
      };
    }
    const path = this.getFilePath(file);
    const parts = path.split('/');
    // We only want direct subfolders of the root folder
    if (parts.length <= 2) {
      return {
        code: 'not-in-subfolder',
        message: `File is not in a subfolder`,
      };
    }
    const [, subFolderName, fileName] = parts;
    // Skip files (those with extensions) and hidden folders
    if (subFolderName.includes('.')) {
      return {
        code: 'hidden-folder',
        message: `File is an hidden folder`,
      };
    }
    if (fileName.startsWith('.')) {
      return {
        code: 'hidden-file',
        message: `File is an hidden file`,
      };
    }
    return null;
  }

  private getFilePath(_file: File) {
    const file = _file as File & { path: string };
    const path = file.path;
    if (path.startsWith('/')) {
      return path.slice(1);
    }
    return path;
  }
}
