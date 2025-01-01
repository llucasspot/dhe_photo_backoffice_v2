import { KlassesDaoArrayAdapter } from './adapters/klasses-dao.array-adapter';

import { Module } from '#di';

@Module({
  providers: [KlassesDaoArrayAdapter],
})
export class KlassesRunTimeModule {}
