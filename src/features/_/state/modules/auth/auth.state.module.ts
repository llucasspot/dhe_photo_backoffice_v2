import { AuthStateNanostores } from './infra/nanostores/auth.state.nanostores';

import { Module } from '#di';
import { AuthState } from '#features/auth/domain';

@Module({
  providers: [
    {
      token: AuthState,
      useToken: AuthStateNanostores,
    },
  ],
})
export class AuthStateModule {}
