import { KlassDto } from '#features/klasses/domain';

export enum ProjectState {
  Published = 'published',
  Unpublished = 'unpublished',
}

export interface ProjectDto {
  schoolId: string;
  school: {
    id: string;
    name: string;
  };
  id: string;
  name: string;
  shotDate: Date;
  orderEndDate: Date;
  messageForClients?: string;
  state: ProjectState;
  klassIds: string[];
  klasses: Omit<KlassDto, 'project'>[];
}
