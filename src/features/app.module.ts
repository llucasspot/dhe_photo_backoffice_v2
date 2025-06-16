import { Module } from '@mygoodstack/di-react/dist';

import { CommonModule } from './common.module';

import { ApiModule } from '#api';
import { CacheModule } from '#cache';
import { StateModule } from '#state/modules';
import { StorageModule } from '#storage/modules';

@Module({
  providers: [ApiModule, CommonModule, StateModule, StorageModule, CacheModule],
})
export class AppModule {}
