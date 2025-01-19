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
      singleton: <T>(options?: { token?: Token<T>; scope?: Scope }) =>
        this.buildSingletonDecorator<T>(dependencyInjectionService)(options),
      inject: this.buildInjectDecorator(dependencyInjectionService),
      Module: this.buildModuleDecorator(dependencyInjectionService),
      adapter: <T>(
        port: Token<T>,
        options?: {
          use?: boolean;
          scope?: Scope;
        },
      ) =>
        this.buildAdapterDecorator<T>(dependencyInjectionService)(
          port,
          options,
        ),
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
    return (options?: { token?: Token<T>; scope?: Scope }) =>
      (target: Type<T>): void => {
        const token = dependencyInjectionService.getToken(
          options?.token ?? target,
        );
        console.log('singleton register : ', token);
        injectable()(target);
        dependencyInjectionService.registerByClass(
          token,
          target,
          options?.scope,
        );
      };
  }

  private static buildAdapterDecorator<T>(
    dependencyInjectionService: DependencyInjectionServicePort,
  ) {
    return (
        port: Token<T>,
        options?: {
          use?: boolean;
          scope?: Scope;
        },
      ) =>
      (target: Type<T>): void => {
        if (options && options.use === false) {
          return;
        }
        const token = dependencyInjectionService.getToken(port);
        console.log('adapter register : ', token);
        injectable()(target);
        dependencyInjectionService.registerByClass(
          token,
          target,
          options?.scope,
        );
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
        providers?: (
          | ({
              token: Token;
              scope?: Scope;
            } & Provider)
          | Type
        )[];
      }) =>
      (target: Type<T>): void => {
        console.log('module register start : ', target.name);
        providers.forEach((provider) => {
          if (this.isInLineProvider(provider)) {
            // do nothing because the register is done in singleton or adapter decorators
            // class need to be load too
            return;
          }

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

  private static isInLineProvider(
    provider:
      | ({
          token: Token;
          scope?: Scope;
        } & Provider)
      | Type,
  ): provider is Type {
    // @ts-expect-error isInLineProvider
    return !provider.token;
  }
}
