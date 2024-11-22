import { AuthProviderMockAdapter } from './infra/providers';

import { Module } from '#di';
import { AuthProviderPort } from '#features/auth/domain';

@Module({
  providers: [
    {
      token: AuthProviderPort,
      useToken: AuthProviderMockAdapter,
    },
  ],
})
export class AuthModule {}
