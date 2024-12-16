import { FileError, FileRejection, useDropzone } from 'react-dropzone';

import { useI18n } from '#i18n/react';

interface FolderDropzoneProps {
  onDrop: <T extends File>(body: {
    acceptedFiles: T[];
    rejectedFiles: FileRejection[];
  }) => Promise<void>;
  fileValidator: <T extends File>(
    file: T,
  ) => FileError | readonly FileError[] | null;
  labels: {
    instructions: string;
    hint: string;
    dragActive: string;
  };
}

export const FolderDropzone = ({
  onDrop,
  fileValidator,
  labels: { instructions, hint, dragActive },
}: FolderDropzoneProps) => {
  const { t } = useI18n();

  const onDropCallback = async (
    acceptedFiles: File[],
    rejectedFiles: FileRejection[],
  ) => {
    await onDrop({
      acceptedFiles,
      rejectedFiles,
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropCallback,
    accept: {
      'image/*': [],
    },
    multiple: true,
    noClick: false,
    noKeyboard: false,
    useFsAccessApi: false, // Disable File System Access API to ensure webkitRelativePath works,
    validator: fileValidator,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragActive
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-300 hover:border-gray-400'
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-blue-600">{t(dragActive)}</p>
      ) : (
        <div>
          <p className="text-gray-600">{t(instructions)}</p>
          <p className="text-sm text-gray-500 mt-2">{t(hint)}</p>
        </div>
      )}
    </div>
  );
};
