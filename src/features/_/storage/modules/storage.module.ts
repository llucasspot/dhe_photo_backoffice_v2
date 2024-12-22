import { StorageServicePort } from '../domain/storage.service.port.ts';
import { StorageServiceLocalStorageAdapter } from '../infra/local-storage/storage.service.local-storage-adapter.ts';

import { Module } from '#di';

@Module({
  providers: [
    {
      token: StorageServicePort,
      useToken: StorageServiceLocalStorageAdapter,
    },
  ],
})
export class StorageModule {}
