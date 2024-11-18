import { Module } from '#di';
import { I18nServicePort } from '#i18n/domain';
import { I18nServiceI18nextAdapter } from '#i18n/infra';

@Module({
  imports: [],
  providers: [
    {
      token: I18nServicePort,
      useClass: I18nServiceI18nextAdapter,
    },
  ],
})
export class I18nModule {}
