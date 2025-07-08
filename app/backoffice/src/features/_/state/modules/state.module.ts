import { Module } from '@mygoodstack/di-react';

import { AuthStateModule } from './auth/auth.state.module';

@Module({
  providers: [AuthStateModule],
})
export class StateModule {}
