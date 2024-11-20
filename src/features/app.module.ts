import { CommonModule } from './common.module';

import { Module } from '#di';
import { AuthModule } from '#features/auth';

@Module({
  imports: [CommonModule, AuthModule],
})
export class AppModule {}
