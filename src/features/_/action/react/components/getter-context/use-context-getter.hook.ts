import { useContext } from 'react';

import { GetterContext, GetterContextType } from './getter.context';

import { GetterI } from '#action/domain';
import { Type } from '#di/domain';

export function useContextGetter<
  TCacheTags extends string[] | Readonly<string[]>,
  TData,
  TArgs extends unknown[],
>(Getter: Type<GetterI<TCacheTags, TData, TArgs>>) {
  const context = useContext(GetterContext) as GetterContextType<
    TCacheTags,
    TData,
    TArgs
  > | null;
  if (!context) {
    throw new Error('useContextGetter must be used within a GetterProvider');
  }
  if (context.Getter != Getter) {
    throw new Error(
      'the provided getter in context does not match the provider getter here',
    );
  }
  return context;
}
