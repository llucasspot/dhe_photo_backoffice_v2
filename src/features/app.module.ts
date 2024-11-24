import { CommonModule } from './common.module';

import { Module } from '#di';
import { AuthModule } from '#features/auth';
import { KlassesModule } from '#features/klasses';
import { ProductsModule } from '#features/products';
import { ProjectsModule } from '#features/projects';
import { SchoolsModule } from '#features/schools';
import { StudentsModule } from '#features/students';

@Module({
  imports: [
    CommonModule,
    AuthModule,
    ProjectsModule,
    ProductsModule,
    SchoolsModule,
    StudentsModule,
    KlassesModule,
  ],
})
export class AppModule {}
