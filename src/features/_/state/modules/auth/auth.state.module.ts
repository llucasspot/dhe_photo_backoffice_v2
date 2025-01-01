import { AuthStateNanostores } from './infra/nanostores/auth.state.nanostores';

import { Module } from '#di';

@Module({
  providers: [AuthStateNanostores],
})
export class AuthStateModule {}
