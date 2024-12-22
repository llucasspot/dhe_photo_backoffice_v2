import {
  StorageItem,
  StorageServicePort,
} from '../../domain/storage.service.port.ts';

import { singleton } from '#di';

@singleton()
export class StorageServiceLocalStorageAdapter implements StorageServicePort {
  get(storageItem: StorageItem): string | null {
    return localStorage.getItem(storageItem.key);
  }

  set(storageItem: StorageItem, newValue: string): void {
    return localStorage.setItem(storageItem.key, newValue);
  }

  remove(storageItem: StorageItem): void {
    return localStorage.removeItem(storageItem.key);
  }
}
