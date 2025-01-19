import { ApiHttpModule } from './api.http.module';

import { Module } from '#di';
import { ApiMockModule } from '#mock';

@Module({
  imports: [ApiMockModule, ApiHttpModule],
})
export class ApiModule {}
