import { QueryClient } from '@tanstack/react-query';

import { CacheServicePort } from '#cache/domain';
import { inject, singleton } from '#di';

@singleton()
export class CacheServiceReactQueryAdapter extends CacheServicePort {
  constructor(
    @inject(QueryClient)
    private readonly queryClient: QueryClient,
  ) {
    super();
  }

  async revalidateTag(...tags: string[][]) {
    if (tags.filter(Array.isArray).length > 0) {
      await Promise.all(
        tags.map((key) =>
          this.queryClient.invalidateQueries({ queryKey: key }),
        ),
      );
      return;
    }
    await this.queryClient.invalidateQueries({ queryKey: tags });
    return;
  }

  async cleanTag(...tags: string[][]) {
    if (tags.filter(Array.isArray).length > 0) {
      await Promise.all(
        tags.map((key) => this.queryClient.removeQueries({ queryKey: key })),
      );
      return;
    }
    this.queryClient.removeQueries({ queryKey: tags });
    return;
  }
}
