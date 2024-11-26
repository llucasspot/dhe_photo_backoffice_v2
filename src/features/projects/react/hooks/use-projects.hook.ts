import { useQuery } from '@tanstack/react-query';

import { useService } from '#di/react';
import { ProjectsControllerServicePort } from '#features/projects/domain';

export const projectsKeys = {
  all: ['projects'] as const,
  lists: () => [...projectsKeys.all, 'list'] as const,
  list: (filters: string) => [...projectsKeys.lists(), { filters }] as const,
  details: () => [...projectsKeys.all, 'detail'] as const,
  detail: (id: string) => [...projectsKeys.details(), id] as const,
};

export const useProjects = () => {
  const projectsService = useService(ProjectsControllerServicePort);

  return useQuery({
    queryKey: projectsKeys.lists(),
    queryFn: () => projectsService.getProjects(),
  });
};
