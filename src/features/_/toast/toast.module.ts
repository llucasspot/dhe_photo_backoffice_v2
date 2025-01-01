import { I18nModule } from '../i18n/i18n.module';

import { ToastServiceToastifyAdapter } from './infra';

import { Module } from '#di';

@Module({
  imports: [I18nModule],
  providers: [ToastServiceToastifyAdapter],
})
export class ToastModule {}
