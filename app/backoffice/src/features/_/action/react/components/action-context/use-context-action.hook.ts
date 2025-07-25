import { useContext } from 'react';
import { Type } from '@mygoodstack/di-react';

import { ActionContext, ActionContextType } from './action.context';

import { ActionI } from '#action/domain';

export function useContextAction<TData, TBody>(
  Action: Type<ActionI<TData, TBody>>,
) {
  const context = useContext(ActionContext) as ActionContextType<
    TData,
    TData
  > | null;
  if (!context) {
    throw new Error('useContextAction must be used within a ActionProvider');
  }
  // @ts-expect-error context.Action
  if (context.Action != Action) {
    throw new Error(
      'the provided action in context does not match the provider action here',
    );
  }
  return context;
}
