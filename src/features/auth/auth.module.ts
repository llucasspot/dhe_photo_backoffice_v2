import { AuthProviderPort } from '#features/auth/domain';
import { AuthProviderMockAdapter } from './infra/providers';

import { Module } from '#di';

@Module({
  providers: [
    {
      token: AuthProviderPort,
      useClass: AuthProviderMockAdapter,
    },
  ],
})
export class AuthModule {}
