import { Token } from '../types';

import { Provider } from './provider';

export type TokenProvider<T> = {
  useToken: Token<T>;
};

export function isTokenProvider<T>(
  provider: Provider<T>,
): provider is TokenProvider<T> {
  return !!(provider as TokenProvider<T>).useToken;
}
