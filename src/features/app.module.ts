import { CommonModule } from './common.module';

import { Module } from '#di';
import { AuthModule } from '#features/auth';
import { ProductsModule } from '#features/products';
import { ProjectsModule } from '#features/projects';
import { SchoolsModule } from '#features/schools';

@Module({
  imports: [
    CommonModule,
    AuthModule,
    ProjectsModule,
    ProductsModule,
    SchoolsModule,
  ],
})
export class AppModule {}
