import { SchoolsServiceApiAdapter } from './infra/schools.service.api-adapter.ts';

import { Module } from '#di';

@Module({
  providers: [SchoolsServiceApiAdapter],
})
export class SchoolsHttpApiModule {}
