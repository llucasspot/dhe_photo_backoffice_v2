import { Type } from '@mygoodstack/di-react';

import { StorageItemSerializer } from './storage-item-serializer.abstract';

import { instanceToPlain, plainToInstance } from '#class-transformer';

export class InstanceStorageItemSerializer<
  TData extends object,
  TDefault extends TData,
> implements StorageItemSerializer<TData, TDefault>
{
  constructor(
    private readonly Dto: Type<TData>,
    public readonly defaultValue: TDefault,
  ) {}

  deserialize(storedValue: string): TData {
    const object = JSON.parse(storedValue);
    return plainToInstance(this.Dto, object);
  }

  serialize(value: TData): string {
    const object = instanceToPlain(this.Dto, value);
    return JSON.stringify(object);
  }
}
