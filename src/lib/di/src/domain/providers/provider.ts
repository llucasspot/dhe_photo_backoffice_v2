import { ClassProvider } from './class-provider';
import { FactoryProvider } from './factory-provider';
import { TokenProvider } from './token-provider';
import { ValueProvider } from './value-provider';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Provider<T = any> =
  | ClassProvider<T>
  | ValueProvider<T>
  | TokenProvider<T>
  | FactoryProvider<T>;
