import { ApiMockModule } from './api.mock.module';

import { Module } from '#di';

@Module({
  imports: [ApiMockModule],
})
export class ApiModule {}
