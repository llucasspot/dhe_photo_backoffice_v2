import { ProjectsDaoPort } from './daos';

import { ForMockControllerService, LogAction } from '#core/domain';
import { inject, singleton } from '#di';
import { KlassesControllerServicePort } from '#features/klasses/domain';
import {
  CreateProjectBody,
  ProjectDto,
  ProjectsControllerServicePort,
  ProjectState,
} from '#features/projects/domain';
import { SchoolsServiceMockAdapter } from '#features/schools/infra';

@singleton()
export class ProjectsServiceMockAdapter
  extends ForMockControllerService
  implements ProjectsControllerServicePort
{
  constructor(
    @inject(ProjectsDaoPort)
    private readonly projectsDao: ProjectsDaoPort,
    @inject(SchoolsServiceMockAdapter)
    private readonly schoolsService: SchoolsServiceMockAdapter,
    @inject(KlassesControllerServicePort)
    private readonly klassesControllerService: KlassesControllerServicePort,
  ) {
    super();
  }

  @LogAction()
  async getProjects(): Promise<ProjectDto[]> {
    await this.delay();
    const res: ProjectDto[] = [];
    const projects = await this.projectsDao.getAll();
    for (const project of projects) {
      const klasses = await this.klassesControllerService.getKlasses(
        project.id,
      );
      const klassIds = klasses.map((klass) => klass.id);
      const school = await this.schoolsService.getSchool(project.schoolId);
      res.push({
        ...project,
        klasses,
        klassIds,
        school,
      });
    }
    return ProjectDto.build(res);
  }

  @LogAction()
  async getProject(id: string): Promise<ProjectDto> {
    await this.delay();
    const project = await this.projectsDao.getById(id);
    if (!project) {
      throw new Error('Project not found');
    }
    const klasses = await this.klassesControllerService.getKlasses(project.id);
    const klassIds = klasses.map((klass) => klass.id);
    const school = await this.schoolsService.getSchool(project.schoolId);
    return ProjectDto.build({
      ...project,
      klasses,
      klassIds,
      school,
    });
  }

  @LogAction()
  async createProject(body: CreateProjectBody): Promise<ProjectDto> {
    await this.delay();
    const project = await this.projectsDao.save({
      ...body,
      state: ProjectState.Unpublished,
    });
    const klasses = await this.klassesControllerService.getKlasses(project.id);
    const klassIds = klasses.map((klass) => klass.id);
    const school = await this.schoolsService.getSchool(project.schoolId);
    return ProjectDto.build({
      ...project,
      klasses,
      klassIds,
      school,
    });
  }

  @LogAction()
  async updateProject(
    id: string,
    body: Partial<ProjectDto>,
  ): Promise<ProjectDto> {
    await this.delay();
    const project = await this.projectsDao.update(id, body);
    if (!project) {
      throw new Error('Project not found');
    }
    const klasses = await this.klassesControllerService.getKlasses(project.id);
    const klassIds = klasses.map((klass) => klass.id);
    const school = await this.schoolsService.getSchool(project.schoolId);
    return ProjectDto.build({
      ...project,
      klasses,
      klassIds,
      school,
    });
  }

  @LogAction()
  async deleteProject(id: string): Promise<void> {
    await this.delay();
    const project = this.projectsDao.deleteById(id);
    if (!project) {
      throw new Error('Project not found');
    }
  }

  @LogAction()
  async uploadPhoto(file: File): Promise<string> {
    await this.delay();
    console.log(file.name);
    const photoId = `photo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    return photoId;
  }
}
