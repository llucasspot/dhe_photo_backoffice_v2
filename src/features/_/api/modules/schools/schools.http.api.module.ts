import { Module } from '@mygoodstack/di-react/dist';

import { SchoolsServiceApiAdapter } from './infra/schools.service.api-adapter';

@Module({
  providers: [SchoolsServiceApiAdapter],
})
export class SchoolsHttpApiModule {}
