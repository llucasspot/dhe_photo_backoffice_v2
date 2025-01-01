import { FileRejection } from 'react-dropzone';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { KlassDropzoneHandlerService } from '../components';

import { useService } from '#di/react';
import { projectsKeys } from '#features/projects/use-cases';
import { ToastService } from '#toast/domain';

export const useCreateKlassesFromFiles = () => {
  const queryClient = useQueryClient();
  const folderDropzoneService = useService(KlassDropzoneHandlerService);
  const toastService = useService(ToastService);

  return useMutation({
    mutationFn: async (body: {
      projectId: string;
      acceptedFiles: File[];
      rejectedFiles: FileRejection[];
    }) => {
      return toastService.promise(() => folderDropzoneService.onDrop(body), {
        pending: 'klasses.create.pending',
        success: 'klasses.create.success',
        error: 'klasses.create.error',
      });
    },
    onSuccess: (_res, body) => {
      queryClient.invalidateQueries({
        // TODO bug see
        queryKey: projectsKeys.detail(body.projectId),
        // queryKey: projectsKeys.all,
      });
    },
    onError: (error) => {
      console.error('Failed to create classes:', error);
    },
  });
};
