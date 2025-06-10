import { AuthProviderApiAdapter } from '../../../../auth/secondary-adapter/auth-provider.api-adapter';

import { Module } from '#di';

@Module({
  providers: [AuthProviderApiAdapter],
})
export class AuthHttpApiModule {}
