import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useService } from '#di/react';
import { AddProductBody } from '#features/projects/domain';
import { ProjectsControllerServicePort } from '#features/projects/domain';
import { projectsKeys } from '#features/projects/use-cases';
import { ToastService } from '#toast/domain';

export const useAddProductToProject = () => {
  const queryClient = useQueryClient();
  const projectsService = useService(ProjectsControllerServicePort);
  const toastService = useService(ToastService);

  return useMutation({
    mutationFn: async (data: AddProductBody) => {
      return toastService.promise(() => projectsService.addProduct(data), {
        pending: 'projects.detail.products.adding',
        success: 'projects.detail.products.added',
        error: 'projects.detail.products.error',
      });
    },
    onSuccess: (_res, { projectId }) => {
      queryClient.invalidateQueries({
        queryKey: projectsKeys.detail(projectId),
      });
    },
    onError: (error) => {
      console.error('Failed to add product:', error);
    },
  });
};
