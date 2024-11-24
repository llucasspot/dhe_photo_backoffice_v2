import { CreateKlassesBody } from '../../domain/create-klasses.body';

import { KlassesMockDao } from './klasses.mock-dao';
import { ProjectsMockDao } from './projects.mock-dao';

import { LogAction, MockAdapter } from '#core/domain';
import { inject, singleton } from '#di';
import {
  CreateProjectBody,
  KlassDto,
  ProjectDto,
  ProjectsServicePort,
  ProjectState,
} from '#features/projects/domain';
import { SchoolsServiceMockAdapter } from '#features/schools/infra';
import { StudentDto } from '#features/students/domain';
import {
  StudentsMockDao,
  StudentsServiceMockAdapter,
} from '#features/students/infra';

@singleton()
export class ProjectsServiceMockAdapter
  extends MockAdapter
  implements ProjectsServicePort
{
  constructor(
    @inject(ProjectsMockDao)
    private readonly projectsDao: ProjectsMockDao,
    @inject(KlassesMockDao)
    private readonly klassesDao: KlassesMockDao,
    @inject(StudentsMockDao)
    private readonly studentsDao: StudentsMockDao,
    @inject(SchoolsServiceMockAdapter)
    private readonly schoolsService: SchoolsServiceMockAdapter,
    @inject(StudentsServiceMockAdapter)
    private readonly studentsService: StudentsServiceMockAdapter,
  ) {
    super();
  }

  @LogAction()
  async getProjects(): Promise<ProjectDto[]> {
    await this.delay();
    const res: ProjectDto[] = [];
    const projects = this.projectsDao.getAll();
    for (const project of projects) {
      const klasses = this.getKlassesWithStudents(project);
      const school = await this.schoolsService.getSchool(project.schoolId);
      res.push({
        ...project,
        klasses,
        school,
      });
    }
    return res;
  }

  async getProject(id: string): Promise<ProjectDto> {
    await this.delay();
    const project = this.projectsDao.getById(id);
    if (!project) {
      throw new Error('Project not found');
    }
    const klasses = this.getKlassesWithStudents(project);
    const school = await this.schoolsService.getSchool(project.schoolId);
    return {
      ...project,
      klasses,
      school,
    };
  }

  async createProject(body: CreateProjectBody): Promise<ProjectDto> {
    await this.delay();
    const project = this.projectsDao.save({
      ...body,
      state: ProjectState.Unpublished,
      klassIds: [],
    });
    const klasses = this.getKlassesWithStudents(project);
    const school = await this.schoolsService.getSchool(project.schoolId);
    return {
      ...project,
      klasses,
      school,
    };
  }

  async updateProject(
    id: string,
    body: Partial<ProjectDto>,
  ): Promise<ProjectDto> {
    await this.delay();
    const project = this.projectsDao.update(id, body);
    if (!project) {
      throw new Error('Project not found');
    }
    const klasses = this.getKlassesWithStudents(project);
    const school = await this.schoolsService.getSchool(project.schoolId);
    return {
      ...project,
      klasses,
      school,
    };
  }

  async deleteProject(id: string): Promise<void> {
    await this.delay();
    const project = this.projectsDao.deleteById(id);
    if (!project) {
      throw new Error('Project not found');
    }
  }

  async createKlassesFromFolders({
    projectId,
    klasses: klassesBody,
  }: CreateKlassesBody): Promise<KlassDto[]> {
    await this.delay();
    const project = await this.getProject(projectId);

    const klasses: Omit<KlassDto, 'project' | 'studentIds' | 'students'>[] = [];
    const students: StudentDto[] = [];
    for (const {
      name,
      studentPicture: { file },
    } of klassesBody) {
      let klass = this.klassesDao.getByName(name);
      if (!klass) {
        klass = this.klassesDao.save({
          name,
          projectId,
        });
      }
      const student = await this.studentsService.createStudent({
        photos: [file],
        klassId: klass.id,
      });
      klasses.push(klass);
      students.push(student);
    }

    return klasses.map((klass) => {
      return {
        ...klass,
        students,
        studentIds: students.map((student) => student.id),
        project,
      };
    });
  }

  async uploadPhoto(photo: File): Promise<string> {
    await this.delay();
    console.log(photo.name);
    const photoId = `photo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    // In a real implementation, we would upload the file to a storage service
    // Here we just store the file name
    // this.uploadedPhotos.set(photoId, photo.name);
    return photoId;
  }

  private getKlassesWithStudents(
    project: Omit<ProjectDto, 'klasses' | 'school'>,
  ): Omit<KlassDto, 'project'>[] {
    return this.klassesDao
      .getAll()
      .filter((klass) => klass.projectId === project.id)
      .map((klass) => {
        const students = this.studentsDao
          .getAll()
          .filter((student) => student.klassId === klass.id);
        return {
          ...klass,
          students,
          studentIds: students.map((student) => student.id),
        };
      });
  }
}
