import { AuthProviderMockAdapter } from './infra/auth-provider.mock-adapter';

import { Module } from '#di';

@Module({
  providers: [AuthProviderMockAdapter],
})
export class AuthApiMockModule {}
