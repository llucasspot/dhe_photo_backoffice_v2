import { useQuery } from '@tanstack/react-query';

import { useService } from '#di/react';
import { KlassesControllerServicePort } from '#features/klasses/domain';

export const klassKeys = {
  all: ['klasses'] as const,
  lists: () => [...klassKeys.all, 'list'] as const,
  list: (filters: string) => [...klassKeys.lists(), { filters }] as const,
  details: () => [...klassKeys.all, 'detail'] as const,
  detail: (id: string) => [...klassKeys.details(), id] as const,
};

export const useKlass = (id: string) => {
  const klassesServicePort = useService(KlassesControllerServicePort);

  return useQuery({
    queryKey: klassKeys.detail(id),
    queryFn: () => klassesServicePort.getKlass(id),
  });
};
