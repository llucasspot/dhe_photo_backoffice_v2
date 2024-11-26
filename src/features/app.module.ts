import { CommonModule } from './common.module';

import { ApiModule } from '#api';
import { Module } from '#di';
import { AuthModule } from '#features/auth';
import { FilesModule } from '#features/files';
import { KlassesModule } from '#features/klasses';
import { ProductsModule } from '#features/products';
import { ProjectsModule } from '#features/projects';
import { SchoolsModule } from '#features/schools';
import { StudentsModule } from '#features/students';

@Module({
  imports: [
    ApiModule,
    CommonModule,
    AuthModule,
    ProjectsModule,
    ProductsModule,
    SchoolsModule,
    StudentsModule,
    KlassesModule,
    FilesModule,
  ],
})
export class AppModule {}
