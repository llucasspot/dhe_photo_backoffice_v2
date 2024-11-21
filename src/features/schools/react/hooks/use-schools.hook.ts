import { useQuery } from '@tanstack/react-query';

import { useService } from '#di/react';
import { SchoolsServicePort } from '#features/schools/domain';

export const schoolsKeys = {
  all: ['schools'] as const,
  lists: () => [...schoolsKeys.all, 'list'] as const,
  list: (filters: string) => [...schoolsKeys.lists(), { filters }] as const,
  details: () => [...schoolsKeys.all, 'detail'] as const,
  detail: (id: string) => [...schoolsKeys.details(), id] as const,
};

export const useSchools = () => {
  const schoolsService = useService(SchoolsServicePort);

  return useQuery({
    queryKey: schoolsKeys.lists(),
    queryFn: () => schoolsService.getSchools(),
  });
};
