import { createContext } from 'react';
import { Type } from '@mygoodstack/di-react';
import { UseMutationResult } from '@tanstack/react-query';

import { ActionI } from '#action/domain';

export type ActionContextType<TData, TBody> = {
  action: ActionI<TData, TBody>;
  Action: Type<ActionI<TData, TBody>>;
  mutation: UseMutationResult<TData, Error, TBody, unknown>;
};

export const ActionContext = createContext<ActionContextType<any, any> | null>(
  null,
);
