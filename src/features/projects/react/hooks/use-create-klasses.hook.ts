import { useMutation, useQueryClient } from '@tanstack/react-query';

import { projectsKeys } from './use-projects.hook';

import { useService } from '#di/react';
import { ProjectsServicePort } from '#features/projects/domain';
import { ToastService } from '#toast/domain';

export const useCreateKlassesFromFolders = (projectId: string) => {
  const queryClient = useQueryClient();
  const projectsService = useService(ProjectsServicePort);
  const toastService = useService(ToastService);

  return useMutation({
    mutationFn: async (folderNames: string[]) => {
      return toastService.promise(
        () => projectsService.createKlassesFromFolders(projectId, folderNames),
        {
          pending: 'projects.detail.klasses.creating',
          success: 'projects.detail.klasses.created',
          error: 'projects.detail.klasses.error',
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: projectsKeys.detail(projectId),
      });
    },
    onError: (error) => {
      console.error('Failed to create classes:', error);
    },
  });
};
