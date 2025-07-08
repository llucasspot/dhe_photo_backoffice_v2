import { Module } from '@mygoodstack/di-react';

import { AuthProviderApiAdapter } from '../../../../auth/secondary-adapter/auth-provider.api-adapter';

@Module({
  providers: [AuthProviderApiAdapter],
})
export class AuthHttpApiModule {}
