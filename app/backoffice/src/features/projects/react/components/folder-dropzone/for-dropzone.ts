import { FileRejection } from 'react-dropzone';

export abstract class ForDropzone<TBody extends object> {
  abstract onDrop(
    body: TBody & {
      acceptedFiles: File[];
      rejectedFiles: FileRejection[];
    },
  ): Promise<void>;

  abstract fileValidator(file: File | DataTransferItem): {
    code: string;
    message: string;
  } | null;
}
