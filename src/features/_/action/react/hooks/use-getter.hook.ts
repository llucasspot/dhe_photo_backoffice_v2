import { useInstance } from '@mygoodstack/di-react';
import { useQuery } from '@tanstack/react-query';

import { GetterI } from '#action/domain';
import { Token } from '#di/domain';

export function useGetter<
  TCacheTags extends string[] | Readonly<string[]>,
  TData,
  TArgs extends unknown[],
>(Getter: Token<GetterI<TCacheTags, TData, TArgs>>, ...args: TArgs) {
  const getter = useInstance<GetterI<TCacheTags, TData, TArgs>>(Getter);
  return useQuery({
    queryKey: getter.cacheTags(...args),
    queryFn: () => getter.get(...args),
  });
}
