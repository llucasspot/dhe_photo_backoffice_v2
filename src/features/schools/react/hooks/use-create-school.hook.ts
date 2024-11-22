import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { schoolsKeys } from './use-schools.hook';

import { useService } from '#di/react';
import { CreateSchoolBody, SchoolsServicePort } from '#features/schools/domain';
import { useI18n } from '#i18n/react';

export const useCreateSchool = () => {
  const queryClient = useQueryClient();
  const { t } = useI18n();
  const schoolsService = useService(SchoolsServicePort);

  return useMutation({
    mutationFn: async (data: CreateSchoolBody) =>
      await schoolsService.createSchools(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: schoolsKeys.lists() });
      toast.success(t('schools.create.success'));
    },
    onError: (error) => {
      console.error('Failed to create school:', error);
      toast.error(t('schools.create.error'));
    },
  });
};
