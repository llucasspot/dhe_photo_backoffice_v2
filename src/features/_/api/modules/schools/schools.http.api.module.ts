import { SchoolsServiceApiAdapter } from './infra/schools.service.api-adapter';

import { Module } from '#di';

@Module({
  providers: [SchoolsServiceApiAdapter],
})
export class SchoolsHttpApiModule {}
