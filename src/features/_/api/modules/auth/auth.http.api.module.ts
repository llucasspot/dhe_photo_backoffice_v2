import { AuthProviderApiAdapter } from '../../../../auth/secondary-adapter/auth-provider.api-adapter.ts';

import { Module } from '#di';

@Module({
  providers: [AuthProviderApiAdapter],
})
export class AuthHttpApiModule {}
