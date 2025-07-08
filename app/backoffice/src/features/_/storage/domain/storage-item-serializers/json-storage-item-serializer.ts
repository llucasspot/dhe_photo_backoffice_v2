import { StorageItemSerializer } from './storage-item-serializer.abstract';

export class JsonStorageItemSerializer<
  TData extends object,
  TDefault extends TData,
> implements StorageItemSerializer<TData, TDefault>
{
  constructor(public readonly defaultValue: TDefault) {}

  deserialize(storedValue: string): TData {
    return JSON.parse(storedValue);
  }

  serialize(value: TData): string {
    return JSON.stringify(value);
  }
}
