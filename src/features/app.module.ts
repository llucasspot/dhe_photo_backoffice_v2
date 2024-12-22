import { CommonModule } from './common.module';

import { ApiModule } from '#api';
import { Module } from '#di';

@Module({
  imports: [ApiModule, CommonModule],
})
export class AppModule {}
