import { Dto } from '#core/domain';
import { ProjectState } from '#features/projects/domain';
import { Dao } from '#mock';

export class Project extends Dto<Project> {
  id!: string;
  schoolId!: string;
  name!: string;
  shotDate!: Date;
  orderEndDate!: Date;
  messageForClients?: string;
  state!: ProjectState;
}

export abstract class ProjectsDaoPort extends Dao<'projects'> {}
