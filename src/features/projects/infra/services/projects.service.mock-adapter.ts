import { MockAdapter } from '#core/domain';
import { inject, singleton } from '#di';
import {
  CreateProjectBody,
  ProjectDto,
  ProjectsServicePort,
  ProjectState,
} from '#features/projects/domain';
import { SchoolsServiceMockAdapter } from '#features/schools/infra';

@singleton()
export class ProjectsServiceMockAdapter
  extends MockAdapter
  implements ProjectsServicePort
{
  private projects: ProjectDto[] = [];

  constructor(
    @inject(SchoolsServiceMockAdapter)
    private readonly schoolsService: SchoolsServiceMockAdapter,
  ) {
    super();
  }

  async getProjects(): Promise<ProjectDto[]> {
    if (!this.projects.length) {
      await this.init();
    }
    return [...this.projects];
  }

  async getProject(id: string): Promise<ProjectDto> {
    const project = this.projects.find((p) => p.id === id);
    if (!project) {
      throw new Error('Project not found');
    }
    return { ...project };
  }

  async createProject(project: CreateProjectBody): Promise<ProjectDto> {
    const school = await this.schoolsService.getSchool(project.schoolId);
    const newProject: ProjectDto = {
      ...project,
      id: (this.projects.length + 1).toString(),
      school,
      state: ProjectState.Unpublished,
    };
    this.projects.push(newProject);
    return { ...newProject };
  }

  async updateProject(
    id: string,
    projectUpdate: Partial<ProjectDto>,
  ): Promise<ProjectDto> {
    const index = this.projects.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error('Project not found');
    }
    const updatedProject = {
      ...this.projects[index],
      ...projectUpdate,
    };
    this.projects[index] = updatedProject;
    return { ...updatedProject };
  }

  async deleteProject(id: string): Promise<void> {
    const index = this.projects.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error('Project not found');
    }
    this.projects.splice(index, 1);
  }

  private async init() {
    const schools = await this.schoolsService.getSchools();
    this.projects = [
      {
        id: '1',
        name: 'School Project A',
        state: ProjectState.Published,
        schoolId: schools[0].id,
        school: schools[0],
        shotDate: new Date(),
        orderEndDate: new Date(),
      },
      {
        id: '2',
        name: 'School Project B',
        state: ProjectState.Unpublished,
        schoolId: schools[1].id,
        school: schools[1],
        shotDate: new Date(),
        orderEndDate: new Date(),
      },
      {
        id: '3',
        name: 'School Project C',
        state: ProjectState.Published,
        schoolId: schools[1].id,
        school: schools[1],
        shotDate: new Date(),
        orderEndDate: new Date(),
      },
    ];
  }
}
