import { createContext } from 'react';
import { UseQueryResult } from '@tanstack/react-query';

import { GetterI } from '#action/domain';
import { Type } from '#di/domain';

export type GetterContextType<
  TCacheTags extends string[] | Readonly<string[]>,
  TData,
  TArgs extends unknown[],
> = {
  getter: GetterI<TCacheTags, TData, TArgs>;
  Getter: Type<GetterI<TCacheTags, TData, TArgs>>;
  queryResult: UseQueryResult<NoInfer<TData>, Error>;
};

export const GetterContext = createContext<GetterContextType<
  any,
  any,
  any
> | null>(null);
