import { Module } from '@mygoodstack/di-react';

import { I18nModule } from './_/i18n/i18n.module';
import { QueryClientGetter } from './QueryClientGetter';

import { RoutingModule } from '#routing';
import { ToastModule } from '#toast';

@Module({
  providers: [RoutingModule, I18nModule, ToastModule, QueryClientGetter],
})
export class CommonModule {}
