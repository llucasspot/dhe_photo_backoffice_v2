import { toast, ToastOptions } from 'react-toastify';

import { ToastServicePort } from '../domain';

import { inject, singleton } from '#di';
import { I18nServicePort } from '#i18n/domain';

@singleton()
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
}
