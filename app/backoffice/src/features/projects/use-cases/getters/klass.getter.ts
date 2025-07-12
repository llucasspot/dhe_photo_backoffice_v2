import { ProjectKlassDto } from '@domain/modules';
import { inject, singleton } from '@mygoodstack/di-react';

import { Getter } from '#action/domain';
import { KlassesControllerServicePort } from '#features/klasses/domain';

export const klassKeys = {
  all: ['klasses'] as const,
  lists: () => [...klassKeys.all, 'list'] as const,
  list: (filters: string) => [...klassKeys.lists(), { filters }] as const,
  details: () => [...klassKeys.all, 'detail'] as const,
  detail: (id: string) => [...klassKeys.details(), id] as const,
};

@singleton()
export class KlassGetter extends Getter<
  ReturnType<typeof klassKeys.detail>,
  ProjectKlassDto,
  [
    {
      projectId: string;
      klassId: string;
    },
  ]
> {
  constructor(
    @inject(KlassesControllerServicePort)
    private readonly klassesControllerService: KlassesControllerServicePort,
  ) {
    super(({ klassId }: { projectId: string; klassId: string }) =>
      klassKeys.detail(klassId),
    );
  }

  get({ projectId, klassId }: { projectId: string; klassId: string }) {
    return this.klassesControllerService.getKlass(projectId, klassId);
  }
}
