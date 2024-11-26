import { ProjectDto } from '#features/projects/domain';
import { Dao } from '#mock';

export type Project = Pick<
  ProjectDto,
  | 'schoolId'
  | 'id'
  | 'name'
  | 'shotDate'
  | 'orderEndDate'
  | 'messageForClients'
  | 'state'
>;

export abstract class ProjectsDaoPort extends Dao<'projects'> {}
