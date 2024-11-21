import { CommonModule } from './common.module';

import { Module } from '#di';
import { AuthModule } from '#features/auth';
import { ProjectsModule } from '#features/projects';
import { SchoolsModule } from '#features/schools';

@Module({
  imports: [CommonModule, AuthModule, ProjectsModule, SchoolsModule],
})
export class AppModule {}
