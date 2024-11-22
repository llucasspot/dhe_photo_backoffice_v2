import { I18nServiceI18nextAdapter } from './src/infra';

import { Module } from '#di';
import { I18nServicePort } from '#i18n/domain';

@Module({
  imports: [],
  providers: [
    {
      token: I18nServicePort,
      useToken: I18nServiceI18nextAdapter,
    },
  ],
})
export class I18nModule {}
