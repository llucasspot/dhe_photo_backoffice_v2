import { Scope } from '../beans';
import {
  ClassProvider,
  FactoryProvider,
  TokenProvider,
  ValueProvider,
} from '../providers';
import { Token } from '../types';

export abstract class DependencyInjectionServicePort {
  abstract getInstance<T>(token: Token<T>): T;

  abstract isRegistered<T>(token: Token<T>): boolean;

  abstract registerByValue<T>(
    token: Token<T>,
    provider: ValueProvider<T>['useValue'],
    scope?: Scope,
  ): void;

  abstract registerByClass<T>(
    token: Token<T>,
    provider: ClassProvider<T>['useClass'],
    scope?: Scope,
  ): void;

  abstract registerByFactory<T>(
    token: Token<T>,
    provider: FactoryProvider<T>['useFactory'],
    scope?: Scope,
  ): void;

  abstract registerByToken<T>(
    token: Token<T>,
    provider: TokenProvider<T>['useToken'],
    scope?: Scope,
  ): void;

  abstract makeTargetInjectable<T>(
    provider: ClassProvider<T>['useClass'],
  ): void;

  abstract buildInjectDecorator<T>(): (token?: Token<T>) => (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    target: any,
    propertyKey: string | symbol | undefined,
    parameterIndex: number,
  ) => void;
}
