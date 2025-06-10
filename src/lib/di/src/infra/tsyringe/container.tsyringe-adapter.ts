import { DependencyContainer, InjectionToken } from 'tsyringe';

import { DependencyInjectionManager } from '../../domain/services/dependency-injection.manager';

import { ContainerPort, Token } from '#di/domain';

export class ContainerTsyringeAdapter implements ContainerPort {
  constructor(private readonly dependencyContainer: DependencyContainer) {}

  getInstance<T>(token: Token<T>): T {
    const _token = DependencyInjectionManager.getToken(token);
    return this.dependencyContainer.resolve<T>(_token as InjectionToken<T>);
  }
}
