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
  lieu: string;
  state: ProjectState;
}
