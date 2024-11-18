import { CommonModule } from './common.module';

import { Module } from '#di';

@Module({
  imports: [CommonModule],
})
export class AppModule {}
