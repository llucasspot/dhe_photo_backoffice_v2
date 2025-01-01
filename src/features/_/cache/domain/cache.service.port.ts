import { GetterI } from '#action/domain';

export abstract class CacheServicePort {
  abstract revalidateTag(
    ...tags: (string[] | Readonly<string[]>)[]
  ): Promise<void>;

  revalidate<
    TCacheTags extends string[] | Readonly<string[]>,
    TData,
    TArgs extends unknown[],
  >(getter: GetterI<TCacheTags, TData, TArgs>, ...args: TArgs) {
    return this.revalidateTag(getter.cacheTags(...args));
  }
}
