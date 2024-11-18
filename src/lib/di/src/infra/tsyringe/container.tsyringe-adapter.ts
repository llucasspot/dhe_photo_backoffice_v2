import { DependencyContainer, InjectionToken } from 'tsyringe';

import { ContainerPort, Token } from '#di/domain';

export class ContainerTsyringeAdapter implements ContainerPort {
  constructor(private readonly dependencyContainer: DependencyContainer) {}

  getInstance<T>(token: Token<T>): T {
    const _token = this.getToken(token);
    return this.dependencyContainer.resolve<T>(_token as InjectionToken<T>);
  }

  private getToken<T>(token: Token<T>) {
    if (typeof token === 'string') {
      return token;
    }
    return token.name;
  }
}
