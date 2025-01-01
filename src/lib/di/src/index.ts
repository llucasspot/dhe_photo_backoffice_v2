import { DependencyInjectionManager } from './domain/services/dependency-injection.manager';
import { DependencyInjectionServiceTsyringeAdapter } from './infra';

export const diService = new DependencyInjectionServiceTsyringeAdapter();

export const { singleton, inject, Module, adapter } =
  DependencyInjectionManager.buildDecorators(diService);
