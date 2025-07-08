import { toast, ToastOptions } from 'react-toastify';
import { adapter } from '@mygoodstack/di-react';

import { ToastServicePort } from '../domain';

@adapter(ToastServicePort)
export class ToastServiceToastifyAdapter extends ToastServicePort {
  constructor() {
    super();
  }

  success(message: string, options?: ToastOptions) {
    return toast.success(message, options);
  }

  error(message: string, options?: ToastOptions) {
    return toast.error(message, options);
  }

  info(message: string, options?: ToastOptions) {
    return toast.info(message, options);
  }

  warn(message: string, options?: ToastOptions) {
    return toast.warn(message, options);
  }

  dark(message: string, options?: ToastOptions) {
    return toast.dark(message, options);
  }

  promise<TPromiseResult>(
    promise: () => Promise<TPromiseResult>,
    messages: {
      success: string;
      pending: string;
      error: string;
    },
  ) {
    return toast.promise(promise, messages);
  }
}
