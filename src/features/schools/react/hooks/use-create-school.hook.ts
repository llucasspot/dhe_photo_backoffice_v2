import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useService } from '#di/react';
import {
  CreateSchoolBody,
  SchoolsServiceControllerServicePort,
} from '#features/schools/domain';
import { schoolsKeys } from '#features/schools/use-cases';
import { ToastService } from '#toast/domain';

export const useCreateSchool = () => {
  const queryClient = useQueryClient();
  const schoolsService = useService(SchoolsServiceControllerServicePort);
  const toastService = useService(ToastService);

  return useMutation({
    mutationFn: async (data: CreateSchoolBody) => {
      return toastService.promise(() => schoolsService.createSchool(data), {
        pending: 'schools.create.pending',
        success: 'schools.create.success',
        error: 'schools.create.error',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: schoolsKeys.lists() });
    },
    onError: (error) => {
      console.error('Failed to create school:', error);
    },
  });
};
