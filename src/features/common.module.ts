import { I18nModule } from './_/i18n/i18n.module';

import { Module } from '#di';
import { RoutingModule } from '#routing';

@Module({
  imports: [RoutingModule, I18nModule],
  providers: [],
})
export class CommonModule {}
