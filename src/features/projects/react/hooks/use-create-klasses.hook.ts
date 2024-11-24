import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CreateKlassesBody } from '../../domain/create-klasses.body';

import { projectsKeys } from './use-projects.hook';

import { useService } from '#di/react';
import { ProjectsServicePort } from '#features/projects/domain';
import { ToastService } from '#toast/domain';

export const useCreateKlassesFromFolders = () => {
  const queryClient = useQueryClient();
  const projectsService = useService(ProjectsServicePort);
  const toastService = useService(ToastService);

  return useMutation({
    mutationFn: async (body: CreateKlassesBody) => {
      return toastService.promise(
        () => projectsService.createKlassesFromFolders(body),
        {
          pending: 'projects.detail.klasses.creating',
          success: 'projects.detail.klasses.created',
          error: 'projects.detail.klasses.error',
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
