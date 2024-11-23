import { useCallback } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';

import { useCreateKlassesFromFolders } from '../hooks';

import { useI18n } from '#i18n/react';

interface FolderDropzoneProps {
  projectId: string;
}

export const FolderDropzone = ({ projectId }: FolderDropzoneProps) => {
  const { t } = useI18n();
  const createKlasses = useCreateKlassesFromFolders(projectId);

  const onDrop = useCallback(
    async (acceptedItems: File[], rejectedItems: FileRejection[]) => {
      console.log('acceptedItems : ', acceptedItems);
      console.log('rejectedItems : ', rejectedItems);

      const uniqueFolders = new Set<string>();
      // Process each file to extract unique folder paths
      acceptedItems.forEach((file) => {
        const path = file.webkitRelativePath;
        const parts = path.split('/');
        // We only want direct subfolders of the root folder
        if (parts.length > 2) {
          const [, subFolderName] = parts;
          // Skip files (those with extensions) and hidden folders
          if (!subFolderName.includes('.')) {
            uniqueFolders.add(subFolderName);
          }
        }
      });

      const folderNames = Array.from(uniqueFolders);

      if (folderNames.length > 0) {
        await createKlasses.mutateAsync(folderNames);
      }
    },
    [createKlasses],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    noClick: false,
    noKeyboard: false,
    useFsAccessApi: false, // Disable File System Access API to ensure webkitRelativePath works
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
        <p className="text-blue-600">
          {t('projects.detail.dropzone.dragActive')}
        </p>
      ) : (
        <div>
          <p className="text-gray-600">
            {t('projects.detail.dropzone.instructions')}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {t('projects.detail.dropzone.dragDrop')}
          </p>
        </div>
      )}
    </div>
  );
};
