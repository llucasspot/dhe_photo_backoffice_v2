import { KlassesDaoPort } from '../../domain/klasses-dao.port';

import { KlassesDaoArrayAdapter } from './adapters/klasses-dao.array-adapter';

import { Module } from '#di';

@Module({
  providers: [
    {
      token: KlassesDaoPort,
      useToken: KlassesDaoArrayAdapter,
    },
  ],
})
export class KlassesRunTimeModule {}
