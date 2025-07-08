import { ToastOptions } from 'react-toastify';
import { inject, singleton } from '@mygoodstack/di-react';

import { ToastServicePort } from './toast.service.port';

import { I18nKey, I18nServicePort } from '#i18n/domain';

@singleton()
export class ToastService {
  constructor(
    @inject(I18nServicePort)
    private readonly i18nService: I18nServicePort,
    @inject(ToastServicePort)
    private readonly toastService: ToastServicePort,
  ) {}

  success(message: I18nKey, options?: ToastOptions) {
    return this.toastService.success(
      this.i18nService.translate(message),
      options,
    );
  }

  error(message: I18nKey, options?: ToastOptions) {
    return this.toastService.error(
      this.i18nService.translate(message),
      options,
    );
  }

  info(message: I18nKey, options?: ToastOptions) {
    return this.toastService.info(this.i18nService.translate(message), options);
  }

  warn(message: I18nKey, options?: ToastOptions) {
    return this.toastService.warn(this.i18nService.translate(message), options);
  }

  dark(message: I18nKey, options?: ToastOptions) {
    return this.toastService.dark(this.i18nService.translate(message), options);
  }

  promise<TPromiseResult>(
    promise: () => Promise<TPromiseResult>,
    messages: {
      success: I18nKey;
      pending: I18nKey;
      error: I18nKey;
    },
  ) {
    return this.toastService.promise(promise, {
      error: this.i18nService.translate(messages.error),
      pending: this.i18nService.translate(messages.pending),
      success: this.i18nService.translate(messages.success),
    });
  }
}
