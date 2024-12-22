import { CommonModule } from './common.module';

import { ApiModule } from '#api';
import { Module } from '#di';
import { StateModule } from '#state';

@Module({
  imports: [ApiModule, CommonModule, StateModule],
})
export class AppModule {}
