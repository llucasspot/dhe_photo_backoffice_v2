import { Token } from '../types';

export abstract class ContainerPort {
  abstract getInstance<T>(token: Token<T>): T;
}
