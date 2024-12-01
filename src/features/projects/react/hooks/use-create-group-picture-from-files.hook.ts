import { FileRejection } from 'react-dropzone';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { KlassPictureDropzoneHandlerService } from '../components';

import { klassKeys } from './use-klass.hook';

import { useService } from '#di/react';
import { ToastService } from '#toast/domain';

export const useCreateGroupPictureFromFiles = () => {
  const queryClient = useQueryClient();
  const klassPictureDropzoneHandlerService = useService(
    KlassPictureDropzoneHandlerService,
  );
  const toastService = useService(ToastService);

  return useMutation({
    mutationFn: async (body: {
      projectId: string;
      klassId: string;
      acceptedFiles: File[];
      rejectedFiles: FileRejection[];
    }) => {
      return toastService.promise(
        () => klassPictureDropzoneHandlerService.onDrop(body),
        {
          pending: 'klasses.create.pending',
          success: 'klasses.create.success',
          error: 'klasses.create.error',
        },
      );
    },
    onSuccess: (_res, body) => {
      queryClient.invalidateQueries({
        // TODO bug see
        queryKey: klassKeys.detail(body.klassId),
        // queryKey: projectsKeys.all,
      });
    },
    onError: (error) => {
      console.error('Failed to create classes:', error);
    },
  });
};
