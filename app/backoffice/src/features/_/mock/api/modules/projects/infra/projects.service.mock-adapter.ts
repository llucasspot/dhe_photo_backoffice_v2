import { ProjectDto } from '@domain/modules';
import { adapter, inject, Scope } from '@mygoodstack/di-react';
import { plainToInstance } from 'class-transformer';

import { Finder, Populator } from '../../../../database/domain';
import { ProjectProductsDaoPort } from '../../../../database/modules/products/domain/project-products-dao.port';
import { ProjectsDaoPort } from '../../../../database/modules/projects/domain/projects-dao.port';
import { ForMockControllerService } from '../../../domain/for-mock-controller-service';
import { HttpError } from '../../../domain/http-error';

import { LogAction } from '#core/domain';
import {
  AddProductBody,
  CreateProjectBody,
  ProjectsControllerServicePort,
} from '#features/projects/domain';

@adapter(ProjectsControllerServicePort, Scope.Singleton, 'mock')
export class ProjectsServiceMockAdapter
  extends ForMockControllerService
  implements ProjectsControllerServicePort
{
  constructor(
    @inject(ProjectsDaoPort)
    private readonly projectsDao: ProjectsDaoPort,
    @inject(ProjectProductsDaoPort)
    private readonly projectProductsDao: ProjectProductsDaoPort,
  ) {
    super();
  }

  async addProduct({
    productId,
    projectId,
    price,
  }: AddProductBody): Promise<ProjectDto> {
    await this.projectProductsDao.save({
      price,
      productId,
      projectId,
    });
    return this.getProject(projectId);
  }

  @LogAction()
  async getProjects(): Promise<ProjectDto[]> {
    await this.delay();
    const projects = await this.projectsDao.getAll(this.buildFinder());
    return plainToInstance(ProjectDto, projects);
  }

  @LogAction()
  async getProject(projectId: string): Promise<ProjectDto> {
    await this.delay();
    const project = await this.projectsDao.get(this.buildFinder(projectId));
    return plainToInstance(ProjectDto, project);
  }

  @LogAction()
  async createProject(body: CreateProjectBody): Promise<ProjectDto> {
    await this.delay();
    const createdProject = await this.projectsDao.save({
      ...body,
      state: 'unpublished',
    });
    const project = this.getProject(createdProject.id);
    return plainToInstance(ProjectDto, project);
  }

  @LogAction()
  async updateProject(
    id: string,
    body: Partial<ProjectDto>,
  ): Promise<ProjectDto> {
    await this.delay();
    const updatedProject = await this.projectsDao.update(id, body);
    if (!updatedProject) {
      throw new HttpError(404, 'Project not found');
    }
    const project = this.getProject(updatedProject.id);
    return plainToInstance(ProjectDto, project);
  }

  @LogAction()
  async deleteProject(id: string): Promise<void> {
    await this.delay();
    const project = this.projectsDao.deleteById(id);
    if (!project) {
      throw new HttpError(404, 'Project not found');
    }
  }

  @LogAction()
  async uploadPhoto(file: File): Promise<string> {
    await this.delay();
    console.log(file.name);
    const photoId = `photo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    return photoId;
  }

  private buildFinder(projectId?: string) {
    const finder = new Finder('projects')
      .populateWith('schoolId', Populator.builder('school', 'schools').build())
      .populateManyWith(
        'projectId',
        Populator.builder('klasses', 'klasses')
          .populateManyWith(
            'klassId',
            Populator.builder('photos', 'groupPictures')
              .populateWith(
                'pictureId',
                Populator.builder('picture', 'pictures').build(),
              )
              .build(),
          )
          .populateManyWith(
            'klassId',
            Populator.builder('students', 'students')
              .populateManyWith(
                'studentId',
                Populator.builder('photos', 'studentPictures')
                  .populateWith(
                    'pictureId',
                    Populator.builder('picture', 'pictures').build(),
                  )
                  .build(),
              )
              .build(),
          )
          .build(),
      )
      .populateManyWith(
        'projectId',
        Populator.builder('products', 'projectProducts')
          .populateWith(
            'productId',
            Populator.builder('product', 'products').build(),
          )
          .build(),
      );
    if (projectId) {
      finder.filtersWith(['id', '$equals', projectId]);
    }
    return finder;
  }
}
