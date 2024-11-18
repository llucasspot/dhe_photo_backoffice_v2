import {
  container,
  DependencyContainer,
  instanceCachingFactory,
  Lifecycle,
  TokenProvider as TsyringeTokenProvider,
} from 'tsyringe';

import { ContainerTsyringeAdapter } from './container.tsyringe-adapter';

import {
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

  registerByValue<T>(token: Token<T>, provider: T): void {
    const _token = this.getToken(token);
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
    const _token = this.getToken(token);
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
    provider: FactoryProvider<T>['useFactory'],
    scope: Scope = Scope.Singleton,
  ): void {
    const _token = this.getToken(token);
    console.log('factory register : ', _token);
    if (scope === Scope.Transient) {
      this.injector.register<T>(_token, {
        useFactory: (container) => {
          return provider(new ContainerTsyringeAdapter(container));
        },
      });
      return;
    }
    this.injector.register<T>(_token, {
      useFactory: instanceCachingFactory((container) => {
        return provider(new ContainerTsyringeAdapter(container));
      }),
    });
    return;
  }

  registerByToken<T>(
    token: Token<T>,
    provider: Token<T>,
    scope: Scope = Scope.Singleton,
  ): void {
    const _token = this.getToken(token);
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

  getInstance<T>(token: Token<T>): T {
    const _token = this.getToken(token);
    return this.injector.resolve<T>(_token);
  }

  private getLifecycle(scope: Scope): Lifecycle {
    return this.scopeMapping[scope];
  }
}
