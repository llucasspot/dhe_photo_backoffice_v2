import { useMutation, useQueryClient } from '@tanstack/react-query';

import { projectsKeys } from './use-projects.hook';

import { useService } from '#di/react';
import { KlassesControllerServicePort } from '#features/klasses/domain';
import { CreateKlassesBody } from '#features/projects/domain';
import { ToastService } from '#toast/domain';

export const useCreateKlassesFromFolders = () => {
  const queryClient = useQueryClient();
  const klassesService = useService(KlassesControllerServicePort);
  const toastService = useService(ToastService);

  return useMutation({
    mutationFn: async (body: CreateKlassesBody) => {
      return toastService.promise(
        () => klassesService.createKlassesFromFolders(body),
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
        queryKey: projectsKeys.detail(body.projectId),
        // queryKey: projectsKeys.all,
      });
    },
    onError: (error) => {
      console.error('Failed to create classes:', error);
    },
  });
};
