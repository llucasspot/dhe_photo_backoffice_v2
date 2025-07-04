import { PropsWithChildren } from 'react';
import { useInstance } from '@mygoodstack/di-react';

import { GetterContext } from './getter.context';

import { GetterI } from '#action/domain';
import { useGetter } from '#action/react';
import { Type } from '#di/domain';

type GetterProviderProps<
  TCacheTags extends string[] | Readonly<string[]>,
  TData,
  TArgs extends unknown[],
> = PropsWithChildren<{
  Getter: Type<GetterI<TCacheTags, TData, TArgs>>;
  args?: TArgs;
}>;

export function GetterProvider<
  TCacheTags extends string[] | Readonly<string[]>,
  TData,
  TArgs extends unknown[] = [],
>({ Getter, args, children }: GetterProviderProps<TCacheTags, TData, TArgs>) {
  const getter = useInstance<GetterI<TCacheTags, TData, TArgs>>(Getter);
  const queryResult = useGetter(Getter, ...(args ?? ([] as unknown as TArgs)));

  return (
    <GetterContext.Provider
      value={{
        Getter,
        getter,
        queryResult,
      }}
    >
      {children}
    </GetterContext.Provider>
  );
}
