import { Token, useInstance } from '@mygoodstack/di-react';
import { useMutation } from '@tanstack/react-query';

import { ActionI } from '#action/domain';
import { ToastService } from '#toast/domain';

export function useAction<TData = void, TBody = void>(
  Action: Token<ActionI<TData, TBody>>,
) {
  const action = useInstance(Action);
  const toastService = useInstance(ToastService);

  return useMutation<TData, Error, TBody>({
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
