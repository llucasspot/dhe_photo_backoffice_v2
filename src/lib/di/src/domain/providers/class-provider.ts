import { Type } from '../types';

import { Provider } from './provider';

export type ClassProvider<T> = {
  useClass: Type<T>;
};

export function isClassProvider<T>(
  provider: Provider<T>,
): provider is ClassProvider<T> {
  return !!(provider as ClassProvider<T>).useClass;
}
