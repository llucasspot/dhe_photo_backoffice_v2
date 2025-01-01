import { ForNanostoresStateValue } from '../../../../infra/nanostores/for-nanostores-state-value';

import { adapter } from '#di';
import { AuthState, AuthUser } from '#features/auth/domain';

@adapter(AuthState)
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
