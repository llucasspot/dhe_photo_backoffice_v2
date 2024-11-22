import { I18nModule } from '../i18n/i18n.module';

import { ToastServicePort } from './domain';
import { ToastServiceToastifyAdapter } from './infra';

import { Module } from '#di';

@Module({
  imports: [I18nModule],
  providers: [
    {
      token: ToastServicePort,
      useToken: ToastServiceToastifyAdapter,
    },
  ],
})
export class ToastModule {}
