import { Module } from '@mygoodstack/di-react';

import { I18nModule } from '../i18n/i18n.module';

import { ToastServiceToastifyAdapter } from './infra';

@Module({
  providers: [I18nModule, ToastServiceToastifyAdapter],
})
export class ToastModule {}
