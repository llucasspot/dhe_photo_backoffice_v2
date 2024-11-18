import { ContainerPort } from '../services';

import { Provider } from './provider';

export type FactoryProvider<T> = {
  useFactory: (dependencyContainer: ContainerPort) => T;
};

export function isFactoryProvider<T>(
  provider: Provider<T>,
): provider is FactoryProvider<T> {
  return !!(provider as FactoryProvider<T>).useFactory;
}
