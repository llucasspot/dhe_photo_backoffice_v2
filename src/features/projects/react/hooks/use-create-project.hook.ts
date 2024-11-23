import { useMutation, useQueryClient } from '@tanstack/react-query';

import { projectsKeys } from './use-projects.hook';

import { useService } from '#di/react';
import {
  CreateProjectBody,
  ProjectsServicePort,
} from '#features/projects/domain';
import { ToastService } from '#toast/domain';

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const projectsService = useService(ProjectsServicePort);
  const toastService = useService(ToastService);

  return useMutation({
    mutationFn: async (data: CreateProjectBody) => {
      return toastService.promise(() => projectsService.createProject(data), {
        pending: 'projects.create.pending',
        success: 'projects.create.success',
        error: 'projects.create.error',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectsKeys.lists() });
    },
    onError: (error) => {
      console.error('Failed to create project:', error);
    },
  });
};
