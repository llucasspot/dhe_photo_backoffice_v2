import { useMutation, useQueryClient } from '@tanstack/react-query';

import { schoolsKeys } from './use-schools.hook';

import { useService } from '#di/react';
import { CreateSchoolBody, SchoolsServicePort } from '#features/schools/domain';
import { ToastService } from '#toast/domain';

export const useCreateSchool = () => {
  const queryClient = useQueryClient();
  const schoolsService = useService(SchoolsServicePort);
  const toastService = useService(ToastService);

  return useMutation({
    mutationFn: async (data: CreateSchoolBody) =>
      await schoolsService.createSchools(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: schoolsKeys.lists() });
      toastService.success('schools.create.success');
    },
    onError: (error) => {
      console.error('Failed to create school:', error);
      toastService.error('schools.create.error');
    },
  });
};
