import { PropsWithChildren } from 'react';
import { Type, useInstance } from '@mygoodstack/di-react';

import { ActionContext } from './action.context.ts';

import { ActionI } from '#action/domain';
import { useAction } from '#action/react';

type ActionProviderProps<TData, TBody> = PropsWithChildren<{
  Action: Type<ActionI<TData, TBody>>;
}>;

export function ActionProvider<TData, TBody>({
  Action,
  children,
}: ActionProviderProps<TData, TBody>) {
  const action = useInstance(Action);
  const mutation = useAction(Action);

  return (
    <ActionContext.Provider
      value={{
        action,
        Action,
        mutation,
      }}
    >
      {children}
    </ActionContext.Provider>
  );
}
