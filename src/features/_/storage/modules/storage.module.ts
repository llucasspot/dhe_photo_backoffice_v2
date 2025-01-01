import { StorageServiceLocalStorageAdapter } from '../infra/local-storage/storage.service.local-storage-adapter';

import { Module } from '#di';

@Module({
  providers: [StorageServiceLocalStorageAdapter],
})
export class StorageModule {}
