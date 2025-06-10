import { AuthHttpApiModule } from './modules/auth/auth.http.api.module';
import { ProjectsHttpApiModule } from './modules/projects/projects.http.api.module';
import { SchoolsHttpApiModule } from './modules/schools/schools.http.api.module';
import { HttpClient } from './utils/http';
import { AuthorizationBearerGetter } from './utils/http/authorization-bearer.getter';

import { Module } from '#di';

@Module({
  imports: [AuthHttpApiModule, ProjectsHttpApiModule, SchoolsHttpApiModule],
  providers: [HttpClient, AuthorizationBearerGetter],
})
export class ApiHttpModule {}
