import { CommonModule } from './common.module';

import { ApiModule } from '#api';
import { CacheModule } from '#cache';
import { Module } from '#di';
import { StateModule } from '#state/modules';
import { StorageModule } from '#storage/modules';

@Module({
  imports: [ApiModule, CommonModule, StateModule, StorageModule, CacheModule],
})
export class AppModule {}
