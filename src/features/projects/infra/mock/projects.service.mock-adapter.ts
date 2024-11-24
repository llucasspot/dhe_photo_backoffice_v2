import { CreateKlassesBody } from '../../domain/create-klasses.body';

import { ProjectsDaoPort } from './daos';

import { LogAction, MockAdapter } from '#core/domain';
import { inject, singleton } from '#di';
import { KlassDto } from '#features/klasses/domain';
import { KlassesDaoPort } from '#features/klasses/infra';
import {
  CreateProjectBody,
  ProjectDto,
  ProjectsServicePort,
  ProjectState,
} from '#features/projects/domain';
import { SchoolsServiceMockAdapter } from '#features/schools/infra';
import {
  StudentsDaoPort,
  StudentsServiceMockAdapter,
} from '#features/students/infra';

@singleton()
export class ProjectsServiceMockAdapter
  extends MockAdapter
  implements ProjectsServicePort
{
  constructor(
    @inject(ProjectsDaoPort)
    private readonly projectsDao: ProjectsDaoPort,
    @inject(KlassesDaoPort)
    private readonly klassesDao: KlassesDaoPort,
    @inject(StudentsDaoPort)
    private readonly studentsDao: StudentsDaoPort,
    @inject(SchoolsServiceMockAdapter)
    private readonly schoolsService: SchoolsServiceMockAdapter,
    @inject(StudentsServiceMockAdapter)
    private readonly studentsService: StudentsServiceMockAdapter,
  ) {
    super();
  }

  @LogAction()
  async getKlass(id: string): Promise<Omit<KlassDto, 'project'>> {
    await this.delay();
    const klass = await this.klassesDao.getById(id);
    if (!klass) {
      throw new Error('Klass not found');
    }
    const students = await this.studentsDao.getAll();
    const klassStudents = students.filter(
      (student) => student.klassId === klass.id,
    );
    return {
      ...klass,
      students: klassStudents,
      studentIds: klassStudents.map((student) => student.id),
    };
  }

  @LogAction()
  async getProjects(): Promise<ProjectDto[]> {
    await this.delay();
    const res: ProjectDto[] = [];
    const projects = await this.projectsDao.getAll();
    for (const project of projects) {
      const klasses = await this.getKlassesWithStudents(project);
      const klassIds = klasses.map((klass) => klass.id);
      const school = await this.schoolsService.getSchool(project.schoolId);
      res.push({
        ...project,
        klasses,
        klassIds,
        school,
      });
    }
    return res;
  }

  @LogAction()
  async getProject(id: string): Promise<ProjectDto> {
    await this.delay();
    const project = await this.projectsDao.getById(id);
    if (!project) {
      throw new Error('Project not found');
    }
    const klasses = await this.getKlassesWithStudents(project);
    const klassIds = klasses.map((klass) => klass.id);
    const school = await this.schoolsService.getSchool(project.schoolId);
    return {
      ...project,
      klasses,
      klassIds,
      school,
    };
  }

  @LogAction()
  async createProject(body: CreateProjectBody): Promise<ProjectDto> {
    await this.delay();
    const project = await this.projectsDao.save({
      ...body,
      state: ProjectState.Unpublished,
    });
    const klasses = await this.getKlassesWithStudents(project);
    const klassIds = klasses.map((klass) => klass.id);
    const school = await this.schoolsService.getSchool(project.schoolId);
    return {
      ...project,
      klasses,
      klassIds,
      school,
    };
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
    const klasses = await this.getKlassesWithStudents(project);
    const klassIds = klasses.map((klass) => klass.id);
    const school = await this.schoolsService.getSchool(project.schoolId);
    return {
      ...project,
      klasses,
      klassIds,
      school,
    };
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
  async createKlassesFromFolders({
    projectId,
    klasses: klassesBody,
  }: CreateKlassesBody): Promise<KlassDto[]> {
    await this.delay();
    const project = await this.getProject(projectId);

    const klasses: Omit<KlassDto, 'project'>[] = [];
    for (const {
      name,
      studentPicture: { file },
    } of klassesBody) {
      let klass = await this.klassesDao.getByName(project.id, name);
      if (!klass) {
        klass = await this.klassesDao.save({
          name,
          projectId,
        });
        const student = await this.studentsService.createStudent({
          photos: [file],
          klassId: klass.id,
        });
        klasses.push({
          ...klass,
          students: [student],
          studentIds: [student].map((student) => student.id),
        });
      }
    }

    return klasses.map((klass) => {
      return {
        ...klass,
        project,
      };
    });
  }

  @LogAction()
  async uploadPhoto(photo: File): Promise<string> {
    await this.delay();
    console.log(photo.name);
    const photoId = `photo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    return photoId;
  }

  @LogAction()
  private async getKlassesWithStudents(
    project: Omit<ProjectDto, 'klasses' | 'school' | 'klassIds'>,
  ): Promise<Omit<KlassDto, 'project'>[]> {
    const klasses = await this.klassesDao.getAll();
    const students = await this.studentsDao.getAll();
    return klasses
      .filter((klass) => klass.projectId === project.id)
      .map((klass) => {
        const klassStudents = students.filter(
          (student) => student.klassId === klass.id,
        );
        return {
          ...klass,
          students: klassStudents,
          studentIds: students.map((student) => student.id),
        };
      });
  }
}
