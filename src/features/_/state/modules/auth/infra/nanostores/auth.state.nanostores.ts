import { adapter } from '@mygoodstack/di-react/dist';

import { ForNanostoresStateValue } from '../../../../infra/nanostores/for-nanostores-state-value';

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
