import { Module } from '@mygoodstack/di-react';

import { ApiHttpModule } from './api.http.module';

import { ApiMockModule } from '#mock';

@Module({
  providers: [ApiMockModule, ApiHttpModule],
})
export class ApiModule {}
