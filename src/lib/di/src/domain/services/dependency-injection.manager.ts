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
        env: ('production' | 'development' | 'mock')[] = [],
        options?: {
          scope?: Scope;
        },
      ) =>
        this.buildAdapterDecorator<T>(dependencyInjectionService)(
          port,
          env,
          options,
        ),
    };
  }

  private static buildInjectDecorator<T>(
    dependencyInjectionService: DependencyInjectionServicePort,
  ) {
    return dependencyInjectionService.buildInjectDecorator<T>();
  }

  private static buildSingletonDecorator<T>(
    dependencyInjectionService: DependencyInjectionServicePort,
  ) {
    return (options?: { scope?: Scope }) =>
      (target: Type<T>): void => {
        const token = DependencyInjectionManager.getToken(target);
        if (dependencyInjectionService.isRegistered(token)) {
          console.log(`adapter ${token} is already registered`);
          return;
        }
        console.log('singleton register : ', token);
        dependencyInjectionService.makeTargetInjectable(target);
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
        env: ('production' | 'development' | 'mock')[] = [],
        options?: {
          scope?: Scope;
        },
      ) =>
      (target: Type<T>): void => {
        if (
          env.length &&
          !env.includes(
            process.env.NODE_ENV as 'production' | 'development' | 'mock',
          )
        ) {
          return;
        }
        const token = DependencyInjectionManager.getToken(port);
        if (dependencyInjectionService.isRegistered(token)) {
          console.log(`adapter ${token} is already registered`);
          return;
        }
        const withProvider = DependencyInjectionManager.getToken(target);
        console.log(`adapter register ${token} with provider ${withProvider}`);
        dependencyInjectionService.makeTargetInjectable(target);
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

          const _token = DependencyInjectionManager.getToken(provider.token);
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

  static getToken<T>(token: Token<T>) {
    if (typeof token === 'string') {
      return token;
    }
    return token.name;
  }
}
