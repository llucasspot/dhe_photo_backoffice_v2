import { ForNanostoresStateValue } from '../../../../infra/nanostores/for-nanostores-state-value';

import { singleton } from '#di';
import { AuthState, AuthUser } from '#features/auth/domain';

@singleton()
export class AuthStateNanostores
  extends ForNanostoresStateValue<{
    currentUser: AuthUser | null;
  }>
  implements AuthState
{
  constructor() {
    super({
      currentUser: null,
    });
  }
}
