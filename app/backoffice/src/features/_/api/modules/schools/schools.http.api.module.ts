import { Module } from '@mygoodstack/di-react';

import { SchoolsServiceApiAdapter } from './infra/schools.service.api-adapter';

@Module({
  providers: [SchoolsServiceApiAdapter],
})
export class SchoolsHttpApiModule {}
