import { FileRejection } from 'react-dropzone';
import { inject, singleton } from '@mygoodstack/di-react/dist';

import { ForDropzone } from './for-dropzone';

import { GroupPicturesCreatorControllerServicePort } from '#features/klasses/domain';

@singleton()
export class KlassPictureDropzoneHandlerService
  implements
    ForDropzone<{
      projectId: string;
    }>
{
  constructor(
    @inject(GroupPicturesCreatorControllerServicePort)
    private readonly groupPicturesCreatorControllerService: GroupPicturesCreatorControllerServicePort,
  ) {}

  async onDrop({
    projectId,
    klassId,
    acceptedFiles,
    rejectedFiles,
  }: {
    projectId: string;
    klassId: string;
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

    const photo = acceptedFiles[0];
    if (photo) {
      await this.groupPicturesCreatorControllerService.createGroupPicture({
        projectId,
        klassId,
        photo: acceptedFiles[0],
      });
    }
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
    // We only want direct file
    if (parts.length != 2) {
      return {
        code: 'not-direct-file',
        message: `File is not directly selected`,
      };
    }
    const [, fileName] = parts;
    // Skip hidden files
    if (fileName.startsWith('')) {
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
