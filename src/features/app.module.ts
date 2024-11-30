import { CommonModule } from './common.module';

import { ApiModule } from '#api';
import { Module } from '#di';
import { AuthModule } from '#features/auth';
import { FilesMockModule } from '#features/files';
import { KlassesMockModule } from '#features/klasses';
import { ProductsMockModule } from '#features/products';
import { ProjectsMockModule } from '#features/projects';
import { SchoolsMockModule } from '#features/schools';
import { StudentsMockModule } from '#features/students';

@Module({
  imports: [
    ApiModule,
    CommonModule,
    AuthModule,
    FilesMockModule,
    ProjectsMockModule,
    ProductsMockModule,
    SchoolsMockModule,
    StudentsMockModule,
    KlassesMockModule,
  ],
})
export class AppModule {}
