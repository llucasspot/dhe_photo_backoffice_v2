import { useQuery } from '@tanstack/react-query';

import { projectsKeys } from './use-projects.hook';

import { useService } from '#di/react';
import { ProjectsServicePort } from '#features/projects/domain';

export const useProject = (id: string) => {
  const projectsService = useService(ProjectsServicePort);

  return useQuery({
    queryKey: projectsKeys.detail(id),
    queryFn: () => projectsService.getProject(id),
  });
};
