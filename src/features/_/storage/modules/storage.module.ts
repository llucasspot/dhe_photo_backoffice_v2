import { BrowserStorageServiceLocalStorageAdapter } from '../infra/local-storage/browser-storage.service.local-storage-adapter';

import { Module } from '#di';

@Module({
  providers: [BrowserStorageServiceLocalStorageAdapter],
})
export class StorageModule {}
