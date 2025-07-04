import { createContext } from 'react';
import { UseMutationResult } from '@tanstack/react-query';

import { ActionI } from '#action/domain';
import { Type } from '#di/domain';

export type ActionContextType<TData, TBody> = {
  action: ActionI<TData, TBody>;
  Action: Type<ActionI<TData, TBody>>;
  mutation: UseMutationResult<TData, Error, TBody, unknown>;
};

export const ActionContext = createContext<ActionContextType<any, any> | null>(
  null,
);
