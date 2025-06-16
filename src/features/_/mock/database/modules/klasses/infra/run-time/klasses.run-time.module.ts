import { Module } from '@mygoodstack/di-react';

import { KlassesDaoArrayAdapter } from './adapters/klasses-dao.array-adapter';

@Module({
  providers: [KlassesDaoArrayAdapter],
})
export class KlassesRunTimeModule {}
