import { I18nServiceI18nextAdapter } from './src/infra';

import { Module } from '#di';

@Module({
  imports: [],
  providers: [I18nServiceI18nextAdapter],
})
export class I18nModule {}
