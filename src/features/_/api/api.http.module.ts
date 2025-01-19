import { AuthApiHttpModule } from './modules/auth/auth.api.http.module';
import { HttpClient } from './utils/http';
import { AuthorizationBearerGetter } from './utils/http/authorization-bearer.getter';

import { Module } from '#di';

@Module({
  imports: [AuthApiHttpModule],
  providers: [HttpClient, AuthorizationBearerGetter],
})
export class ApiHttpModule {}
