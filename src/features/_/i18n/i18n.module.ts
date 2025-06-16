import { Module } from '@mygoodstack/di-react';

import { I18nServiceI18nextAdapter } from './src/infra';

@Module({
  providers: [I18nServiceI18nextAdapter],
})
export class I18nModule {}
