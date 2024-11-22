import { singleton } from '#di';
import {
  ProjectDto,
  ProjectsServicePort,
  ProjectState,
} from '#features/projects/domain';

@singleton()
export class ProjectsServiceMockAdapter extends ProjectsServicePort {
  private projects: ProjectDto[] = [
    {
      id: '1',
      name: 'School Project A',
      schoolName: 'High School 1',
      lieu: 'Paris',
      state: ProjectState.Published,
    },
    {
      id: '2',
      name: 'School Project B',
      schoolName: 'High School 2',
      lieu: 'Lyon',
      state: ProjectState.Unpublished,
    },
    {
      id: '3',
      name: 'School Project C',
      schoolName: 'High School 3',
      lieu: 'Marseille',
      state: ProjectState.Published,
    },
  ];

  async getProjects(): Promise<ProjectDto[]> {
    return [...this.projects];
  }

  async getProject(id: string): Promise<ProjectDto> {
    const project = this.projects.find((p) => p.id === id);
    if (!project) {
      throw new Error('Project not found');
    }
    return { ...project };
  }

  async createProject(project: Omit<ProjectDto, 'id'>): Promise<ProjectDto> {
    const newProject = {
      ...project,
      id: (this.projects.length + 1).toString(),
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
}
