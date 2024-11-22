export enum ProjectState {
  Published = 'published',
  Unpublished = 'unpublished',
}

export interface ProjectDto {
  schoolName: string;
  id: string;
  name: string;
  lieu: string;
  state: ProjectState;
}
