import {
  container,
  DependencyContainer,
  inject as tsinject,
  injectable,
  instanceCachingFactory,
  Lifecycle,
  TokenProvider as TsyringeTokenProvider,
} from 'tsyringe';

import { DependencyInjectionManager } from '../../domain/services/dependency-injection.manager';

import { ContainerTsyringeAdapter } from './container.tsyringe-adapter';

import {
  ClassProvider,
  DependencyInjectionServicePort,
  FactoryProvider,
  Scope,
  Token,
  Type,
} from '#di/domain';

export class DependencyInjectionServiceTsyringeAdapter extends DependencyInjectionServicePort {
  private injector: DependencyContainer;
  private scopeMapping = {
    [Scope.Transient]: Lifecycle.Transient,
    [Scope.Singleton]: Lifecycle.Singleton,
    [Scope.ResolutionScoped]: Lifecycle.ResolutionScoped,
    [Scope.ContainerScoped]: Lifecycle.ContainerScoped,
  } as const;

  constructor(readonly dependencyContainer?: DependencyContainer) {
    super();
    this.injector = dependencyContainer ?? container.createChildContainer();
  }

  isRegistered<T>(token: Token<T>): boolean {
    const _token = DependencyInjectionManager.getToken(token);
    return this.injector.isRegistered(_token);
  }

  makeTargetInjectable<T>(provider: ClassProvider<T>['useClass']): void {
    injectable()(provider);
  }

  registerByValue<T>(token: Token<T>, provider: T): void {
    const _token = DependencyInjectionManager.getToken(token);
    console.log('value register : ', _token);
    this.injector.register<T>(_token, {
      useValue: provider,
    });
  }

  registerByClass<T>(
    token: Token<T>,
    provider: Type<T>,
    scope: Scope = Scope.Singleton,
  ): void {
    const _token = DependencyInjectionManager.getToken(token);
    console.log('class register : ', _token);
    this.injector.register<T>(
      _token,
      {
        useClass: provider,
      },
      {
        lifecycle: this.getLifecycle(scope),
      },
    );
  }

  registerByFactory<T>(
    token: Token<T>,
    useFactory: FactoryProvider<T>['useFactory'],
    scope: Scope = Scope.Singleton,
  ): void {
    const _token = DependencyInjectionManager.getToken(token);
    console.log('factory register : ', _token);
    if (scope === Scope.Transient) {
      this.injector.register<T>(_token, {
        useFactory: (container) => {
          return useFactory(new ContainerTsyringeAdapter(container));
        },
      });
      return;
    }
    this.injector.register<T>(_token, {
      useFactory: instanceCachingFactory((container) => {
        return useFactory(new ContainerTsyringeAdapter(container));
      }),
    });
    return;
  }

  registerByToken<T>(
    token: Token<T>,
    provider: Token<T>,
    scope: Scope = Scope.Singleton,
  ): void {
    const _token = DependencyInjectionManager.getToken(token);
    console.log('token register : ', _token);
    this.injector.register<T>(
      _token,
      {
        useToken: provider as TsyringeTokenProvider<T>['useToken'],
      },
      {
        lifecycle: this.getLifecycle(scope),
      },
    );
  }

  buildInjectDecorator<T>(): (token?: Token<T>) => (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    target: any,
    propertyKey: string | symbol | undefined,
    parameterIndex: number,
  ) => void {
    return (token?: Token<T>) =>
      (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        target: any,
        propertyKey: string | symbol | undefined,
        parameterIndex: number,
      ): void => {
        const _token = DependencyInjectionManager.getToken(token ?? target);
        tsinject(_token)(target, propertyKey, parameterIndex);
      };
  }

  getInstance<T>(token: Token<T>): T {
    const _token = DependencyInjectionManager.getToken(token);
    return this.injector.resolve<T>(_token);
  }

  private getLifecycle(scope: Scope): Lifecycle {
    return this.scopeMapping[scope];
  }
}
