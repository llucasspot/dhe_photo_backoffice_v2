import { Module } from '@mygoodstack/di-react';

import { AuthHttpApiModule } from './modules/auth/auth.http.api.module';
import { ProjectsHttpApiModule } from './modules/projects/projects.http.api.module';
import { SchoolsHttpApiModule } from './modules/schools/schools.http.api.module';
import { HttpClient } from './utils/http';
import { AuthorizationBearerGetter } from './utils/http/authorization-bearer.getter';

@Module({
  providers: [
    AuthHttpApiModule,
    ProjectsHttpApiModule,
    SchoolsHttpApiModule,
    HttpClient,
    AuthorizationBearerGetter,
  ],
})
export class ApiHttpModule {}
