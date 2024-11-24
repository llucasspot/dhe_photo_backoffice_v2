import { Dto } from '#core/domain';
import { ProjectDto } from '#features/projects/domain';
import { StudentDto } from '#features/students/domain';

export class KlassDto extends Dto<KlassDto> {
  id!: string;
  name!: string;
  projectId!: string;
  project!: Omit<ProjectDto, 'klasses' | 'klassIds'>;
  studentIds!: string[];
  students!: StudentDto[];
}
