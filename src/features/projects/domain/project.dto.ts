import { KlassDto } from '#features/klasses/domain';
import { SchoolDto } from '#features/schools/domain';

export enum ProjectState {
  Published = 'published',
  Unpublished = 'unpublished',
}

export interface ProjectDto {
  id: string;
  schoolId: string;
  school?: Omit<SchoolDto, 'projects' | 'projectIds'>;
  name: string;
  shotDate: Date;
  orderEndDate: Date;
  messageForClients?: string;
  state: ProjectState;
  klassIds: string[];
  klasses: Omit<KlassDto, 'project'>[];
}
