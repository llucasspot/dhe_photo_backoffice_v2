import { diService } from '#di';
import { Token } from '#di/domain';

export function useService<T>(token: Token<T>) {
  return diService.getInstance(token);
}
