import { CommonModule } from './common.module';

import { Module } from '#di';
import { AuthModule } from '#features/auth';
import { ProjectsModule } from '#features/projects';

@Module({
  imports: [CommonModule, AuthModule, ProjectsModule],
})
export class AppModule {}
