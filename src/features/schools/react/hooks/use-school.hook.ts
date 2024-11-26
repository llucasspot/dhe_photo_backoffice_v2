import { useQuery } from '@tanstack/react-query';

import { schoolsKeys } from './use-schools.hook';

import { useService } from '#di/react';
import { SchoolsServiceControllerServicePort } from '#features/schools/domain';

export const useSchool = (id: string) => {
  const schoolsService = useService(SchoolsServiceControllerServicePort);

  return useQuery({
    queryKey: schoolsKeys.detail(id),
    queryFn: () => schoolsService.getSchool(id),
  });
};
