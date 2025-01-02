import { StorageItemSerializer } from './storage-item-serializers/storage-item-serializer.abstract';
import { StringStorageItemSerializer } from './storage-item-serializers/string-storage-item-serializer';
import { BrowserStorageServicePort } from './browser-storage.service.port';

import { inject, singleton } from '#di';

export class StorageItem<TData, TDefaultValue> {
  constructor(
    public key: string,
    public storageItemSerializer: StorageItemSerializer<TData, TDefaultValue>,
  ) {}
}

@singleton()
export class StorageService {
  static currentUserId = new StorageItem(
    'currentUserId',
    new StringStorageItemSerializer(null),
  );
  static currentAccessToken = new StorageItem(
    'currentAccessToken',
    new StringStorageItemSerializer(null),
  );

  constructor(
    @inject(BrowserStorageServicePort)
    private readonly browserStorageService: BrowserStorageServicePort,
  ) {}

  get<TData, TDefault>(
    storageItem: StorageItem<TData, TDefault>,
  ): TData | TDefault {
    const string = this.browserStorageService.get(storageItem.key);
    if (string) {
      return storageItem.storageItemSerializer.deserialize(string);
    }
    return storageItem.storageItemSerializer.defaultValue;
  }

  set<TData, TDefault>(
    storageItem: StorageItem<TData, TDefault>,
    newValue: TData,
  ): void {
    const string = storageItem.storageItemSerializer.serialize(newValue);
    return this.browserStorageService.set(storageItem.key, string);
  }

  remove<TData, TDefault>(storageItem: StorageItem<TData, TDefault>): void {
    return this.browserStorageService.remove(storageItem.key);
  }
}
