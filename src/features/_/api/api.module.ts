import { Module } from '#di';
import { ApiMockModule } from '#mock';

@Module({
  imports: [ApiMockModule],
})
export class ApiModule {}
