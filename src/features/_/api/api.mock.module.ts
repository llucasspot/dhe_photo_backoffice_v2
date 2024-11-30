import { Module } from '#di';
import { DatabaseDexieModule } from '#mock';

@Module({
  imports: [DatabaseDexieModule],
})
export class ApiMockModule {}
