import { AuthStateModule } from './auth/auth.state.module';

import { Module } from '#di';

@Module({
  imports: [AuthStateModule],
})
export class StateModule {}
