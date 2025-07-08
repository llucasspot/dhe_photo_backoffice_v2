import { Type } from '@mygoodstack/di-react';

export interface MappedType<T> extends Type<T> {
  new (): T;
}
