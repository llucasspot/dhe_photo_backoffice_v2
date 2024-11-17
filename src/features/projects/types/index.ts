export interface ProjectDto {
  schoolName: string;
  id: string;
  name: string;
  lieu: string;
  etat: 'published' | 'unpublished';
}