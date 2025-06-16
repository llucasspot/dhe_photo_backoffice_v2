import { adapter, inject } from '@mygoodstack/di-react/dist';

import { QueryClientGetter } from '../../../QueryClientGetter';

import { CacheServicePort } from '#cache/domain';

@adapter(CacheServicePort)
export class CacheServiceReactQueryAdapter extends CacheServicePort {
  constructor(
    @inject(QueryClientGetter)
    private readonly gueryClientGetter: QueryClientGetter,
  ) {
    super();
  }

  async revalidateTag(...tags: string[][]) {
    if (tags.filter(Array.isArray).length > 0) {
      await Promise.all(
        tags.map((key) =>
          this.gueryClientGetter.get().invalidateQueries({ queryKey: key }),
        ),
      );
      return;
    }
    await this.gueryClientGetter.get().invalidateQueries({ queryKey: tags });
    return;
  }

  async cleanTag(...tags: string[][]) {
    if (tags.filter(Array.isArray).length > 0) {
      await Promise.all(
        tags.map((key) =>
          this.gueryClientGetter.get().removeQueries({ queryKey: key }),
        ),
      );
      return;
    }
    this.gueryClientGetter.get().removeQueries({ queryKey: tags });
    return;
  }
}
