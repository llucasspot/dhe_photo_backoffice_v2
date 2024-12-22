import { AuthProviderMockAdapter } from './infra/auth-provider.mock-adapter';

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
export class AuthApiMockModule {}
