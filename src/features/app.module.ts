import { AuthModule } from '#features/auth';
import { CommonModule } from './common.module';

import { Module } from '#di';

@Module({
  imports: [CommonModule, AuthModule],
})
export class AppModule {}
