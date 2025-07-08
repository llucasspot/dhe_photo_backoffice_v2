import { Type } from '@mygoodstack/di-react';

import { StorageItemSerializer } from './storage-item-serializer.abstract';

import { instanceToPlain, plainToInstance } from '#class-transformer';

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
