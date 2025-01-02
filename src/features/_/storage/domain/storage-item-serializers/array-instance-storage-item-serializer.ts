import { StorageItemSerializer } from './storage-item-serializer.abstract';

import { instanceToPlain, plainToInstance } from '#class-transformer';
import { Type } from '#di/domain';

export class ArrayInstanceStorageItemSerializer<
  TData extends object,
  TDefault extends Array<TData>,
> implements StorageItemSerializer<TData[], TDefault>
{
  constructor(
    private readonly Dto: Type<TData>,
    public readonly defaultValue: TDefault,
  ) {}

  deserialize(storedValue: string): TData[] {
    const objects: TData[] = JSON.parse(storedValue);
    return plainToInstance(this.Dto, objects);
  }

  serialize(values: TData[]): string {
    const objects = instanceToPlain<TData>(values);
    return JSON.stringify(objects);
  }
}
