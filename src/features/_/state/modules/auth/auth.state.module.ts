import { Module } from '@mygoodstack/di-react/dist';

import { AuthStateNanostores } from './infra/nanostores/auth.state.nanostores';

@Module({
  providers: [AuthStateNanostores],
})
export class AuthStateModule {}
