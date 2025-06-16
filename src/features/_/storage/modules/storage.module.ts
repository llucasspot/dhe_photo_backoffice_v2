import { Module } from '@mygoodstack/di-react/dist';

import { BrowserStorageServiceLocalStorageAdapter } from '../infra/local-storage/browser-storage.service.local-storage-adapter';

@Module({
  providers: [BrowserStorageServiceLocalStorageAdapter],
})
export class StorageModule {}
