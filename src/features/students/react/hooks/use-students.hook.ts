import { useQuery } from '@tanstack/react-query';

import { useService } from '#di/react';
import { StudentsServicePort } from '#features/students/domain';

export const studentsKeys = {
  all: ['students'] as const,
  lists: () => [...studentsKeys.all, 'list'] as const,
  list: (klassId: string) => [...studentsKeys.lists(), klassId] as const,
  details: () => [...studentsKeys.all, 'detail'] as const,
  detail: (id: string) => [...studentsKeys.details(), id] as const,
};

export const useStudents = (klassId: string) => {
  const studentsService = useService(StudentsServicePort);

  return useQuery({
    queryKey: studentsKeys.list(klassId),
    queryFn: () => studentsService.getStudents(klassId),
  });
};
