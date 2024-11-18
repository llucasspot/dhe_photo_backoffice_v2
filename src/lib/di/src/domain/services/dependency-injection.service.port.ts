import { inject as tsinject, injectable } from 'tsyringe';

import { Scope } from '../beans';
import {
  ClassProvider,
  FactoryProvider,
  isClassProvider,
  isFactoryProvider,
  isTokenProvider,
  isValueProvider,
  Provider,
  TokenProvider,
  ValueProvider,
} from '../providers';
import { Token, Type } from '../types';

export abstract class DependencyInjectionServicePort {
  abstract getInstance<T>(token: Token<T>): T;

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

  public getToken<T>(token: Token<T>) {
    if (typeof token === 'string') {
      return token;
    }
    return token.name;
  }

  buildDecorators() {
    return {
      singleton: this.buildSingletonDecorator(),
      inject: this.buildInjectDecorator(),
      Module: this.buildModuleDecorator(),
    };
  }

  private buildInjectDecorator<T>() {
    return (token?: Token<T>) =>
      (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        target: any,
        propertyKey: string | symbol | undefined,
        parameterIndex: number,
      ): void => {
        const _token = this.getToken(token ?? target);
        tsinject(_token)(target, propertyKey, parameterIndex);
      };
  }

  private buildSingletonDecorator<T>() {
    return (token?: Token<T>) =>
      (target: Type<T>): void => {
        const _token = this.getToken(token ?? target);
        console.log('singleton register : ', _token);
        injectable()(target);
        this.registerByClass(_token, target);
      };
  }

  private buildModuleDecorator<T>() {
    return ({
        providers = [],
        // @ts-expect-error @typescript-eslint/no-unused-vars
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        imports = [],
      }: {
        imports?: Type[];
        providers?: ({
          token: Token;
          scope?: Scope;
        } & Provider)[];
      }) =>
      (target: Type<T>): void => {
        console.log('module register start : ', target.name);
        providers.forEach((provider) => {
          const _token = this.getToken(provider.token);
          const scope = provider.scope ?? Scope.Singleton;

          if (isFactoryProvider(provider)) {
            this.registerByFactory(_token, provider.useFactory, scope);
          }
          if (isTokenProvider(provider)) {
            this.registerByToken(_token, provider.useToken, scope);
          }
          if (isValueProvider(provider)) {
            this.registerByValue(_token, provider.useValue, scope);
          }
          if (isClassProvider(provider)) {
            this.registerByClass(_token, provider.useClass, scope);
          }
        });
        console.log('module register end : ', target.name);
      };
  }
}
