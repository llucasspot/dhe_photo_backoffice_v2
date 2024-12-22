export class StorageItem {
  constructor(public key: string) {}
}

export abstract class StorageServicePort {
  static currentUserId = new StorageItem('currentUserId');
  static currentAccessToken = new StorageItem('currentAccessToken');

  abstract get(storageItem: StorageItem): string | null;

  abstract set(storageItem: StorageItem, newValue: string): void;

  abstract remove(storageItem: StorageItem): void;
}
