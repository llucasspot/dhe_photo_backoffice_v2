import { ToastOptions } from 'react-toastify';

import { ToastServicePort } from './toast.service.port.ts';

import { inject, singleton } from '#di';
import { I18nServicePort } from '#i18n/domain';

@singleton()
export class ToastService extends ToastServicePort {
  constructor(
    @inject(I18nServicePort)
    private readonly i18nService: I18nServicePort,
    @inject(ToastServicePort)
    private readonly toastService: ToastServicePort,
  ) {
    super();
  }

  success(message: string, options?: ToastOptions) {
    return this.toastService.success(
      this.i18nService.translate(message),
      options,
    );
  }

  error(message: string, options?: ToastOptions) {
    return this.toastService.error(
      this.i18nService.translate(message),
      options,
    );
  }

  info(message: string, options?: ToastOptions) {
    return this.toastService.info(this.i18nService.translate(message), options);
  }

  warn(message: string, options?: ToastOptions) {
    return this.toastService.warn(this.i18nService.translate(message), options);
  }

  dark(message: string, options?: ToastOptions) {
    return this.toastService.dark(this.i18nService.translate(message), options);
  }
}
