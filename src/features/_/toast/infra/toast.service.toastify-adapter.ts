import { toast, ToastOptions } from 'react-toastify';

import { ToastServicePort } from '../domain';

import { adapter, inject } from '#di';
import { I18nServicePort } from '#i18n/domain';

@adapter(ToastServicePort)
export class ToastServiceToastifyAdapter extends ToastServicePort {
  constructor(
    @inject(I18nServicePort)
    private readonly i18nService: I18nServicePort,
  ) {
    super();
  }

  success(message: string, options?: ToastOptions) {
    return toast.success(this.i18nService.translate(message), options);
  }

  error(message: string, options?: ToastOptions) {
    return toast.error(this.i18nService.translate(message), options);
  }

  info(message: string, options?: ToastOptions) {
    return toast.info(this.i18nService.translate(message), options);
  }

  warn(message: string, options?: ToastOptions) {
    return toast.warn(this.i18nService.translate(message), options);
  }

  dark(message: string, options?: ToastOptions) {
    return toast.dark(this.i18nService.translate(message), options);
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
