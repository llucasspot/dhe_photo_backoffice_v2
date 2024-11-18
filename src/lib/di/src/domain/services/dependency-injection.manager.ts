import { inject as tsinject, injectable } from 'tsyringe';

import {
  DependencyInjectionServicePort,
  isClassProvider,
  isFactoryProvider,
  isTokenProvider,
  isValueProvider,
  Provider,
  Scope,
  Token,
  Type,
} from '#di/domain';

export class DependencyInjectionManager {
  static buildDecorators(
    dependencyInjectionService: DependencyInjectionServicePort,
  ) {
    return {
      singleton: this.buildSingletonDecorator(dependencyInjectionService),
      inject: this.buildInjectDecorator(dependencyInjectionService),
      Module: this.buildModuleDecorator(dependencyInjectionService),
    };
  }

  private static buildInjectDecorator<T>(
    dependencyInjectionService: DependencyInjectionServicePort,
  ) {
    return (token?: Token<T>) =>
      (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        target: any,
        propertyKey: string | symbol | undefined,
        parameterIndex: number,
      ): void => {
        const _token = dependencyInjectionService.getToken(token ?? target);
        tsinject(_token)(target, propertyKey, parameterIndex);
      };
  }

  private static buildSingletonDecorator<T>(
    dependencyInjectionService: DependencyInjectionServicePort,
  ) {
    return (token?: Token<T>) =>
      (target: Type<T>): void => {
        const _token = dependencyInjectionService.getToken(token ?? target);
        console.log('singleton register : ', _token);
        injectable()(target);
        dependencyInjectionService.registerByClass(_token, target);
      };
  }

  private static buildModuleDecorator<T>(
    dependencyInjectionService: DependencyInjectionServicePort,
  ) {
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
          const _token = dependencyInjectionService.getToken(provider.token);
          const scope = provider.scope ?? Scope.Singleton;

          if (isFactoryProvider(provider)) {
            dependencyInjectionService.registerByFactory(
              _token,
              provider.useFactory,
              scope,
            );
          }
          if (isTokenProvider(provider)) {
            dependencyInjectionService.registerByToken(
              _token,
              provider.useToken,
              scope,
            );
          }
          if (isValueProvider(provider)) {
            dependencyInjectionService.registerByValue(
              _token,
              provider.useValue,
              scope,
            );
          }
          if (isClassProvider(provider)) {
            dependencyInjectionService.registerByClass(
              _token,
              provider.useClass,
              scope,
            );
          }
        });
        console.log('module register end : ', target.name);
      };
  }
}
