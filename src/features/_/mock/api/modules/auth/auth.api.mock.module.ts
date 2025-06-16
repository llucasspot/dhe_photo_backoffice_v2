import { Module } from '@mygoodstack/di-react/dist';

import { AuthProviderMockAdapter } from './infra/auth-provider.mock-adapter';

@Module({
  providers: [AuthProviderMockAdapter],
})
export class AuthApiMockModule {}
