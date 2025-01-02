import { StorageItemSerializer } from './storage-item-serializer.abstract';

export class StringStorageItemSerializer<
  TData extends string,
  TDefault extends TData | null,
> implements StorageItemSerializer<TData, TDefault>
{
  constructor(public readonly defaultValue: TDefault) {}

  deserialize(storedValue: string): TData {
    return storedValue as TData;
  }

  serialize(value: TData): string {
    return value;
  }
}
