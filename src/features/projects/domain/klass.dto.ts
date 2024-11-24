import { ProjectDto } from './project.dto';

import { StudentDto } from '#features/students/domain';

export interface KlassDto {
  id: string;
  name: string;
  projectId: string;
  project: ProjectDto;
  studentIds: string[];
  students: StudentDto[];
}
