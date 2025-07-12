import { Type } from '@mygoodstack/di-core';

export interface MappedType<T> extends Type<T> {
  new (): T;
}
