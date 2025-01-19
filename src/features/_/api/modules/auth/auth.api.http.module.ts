import { AuthProviderApiAdapter } from './infra/auth-provider.api-adapter';

import { Module } from '#di';

@Module({
  providers: [AuthProviderApiAdapter],
})
export class AuthApiHttpModule {}
