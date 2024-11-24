import { ProjectDto } from '#features/projects/domain';
import { Dao } from '#mock';

export abstract class ProjectsDaoPort extends Dao<
  Omit<ProjectDto, 'klasses' | 'school'>
> {}
