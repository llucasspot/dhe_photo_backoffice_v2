import { useMutation } from '@tanstack/react-query';

import { ActionI } from '#action/domain';
import { Token } from '#di/domain';
import { useService } from '#di/react';
import { ToastService } from '#toast/domain';

export function useAction<TData, TBody>(Action: Token<ActionI<TData, TBody>>) {
  const action = useService(Action);
  const toastService = useService(ToastService);

  return useMutation({
    mutationFn: async (body: TBody) => {
      return toastService.promise(() => action.execute(body), action.i18nKeys);
    },
    onSuccess: (data, body) => {
      return action.onSuccess(data, body);
    },
    onError: (error) => {
      return action.onError(error);
    },
  });
}
