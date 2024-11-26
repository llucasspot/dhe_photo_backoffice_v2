import { KlassesDaoPort } from './daos';

import { ForMockControllerService, LogAction } from '#core/domain';
import { inject, singleton } from '#di';
import {
  KlassDto,
  KlassesControllerServicePort,
} from '#features/klasses/domain';
import { CreateKlassesBody } from '#features/projects/domain';
import { ProjectsControllerServicePort } from '#features/projects/domain';
import { StudentsCreatorControllerServicePort } from '#features/students/domain';
import { StudentsGetterControllerServicePort } from '#features/students/domain';

@singleton()
export class KlassesServiceMockAdapter
  extends ForMockControllerService
  implements KlassesControllerServicePort
{
  constructor(
    @inject(KlassesDaoPort)
    private readonly klassesDao: KlassesDaoPort,
    @inject(ProjectsControllerServicePort)
    private readonly projectsService: ProjectsControllerServicePort,
    @inject(StudentsGetterControllerServicePort)
    private readonly studentsGetter: StudentsGetterControllerServicePort,
    @inject(StudentsCreatorControllerServicePort)
    private readonly studentsCreator: StudentsCreatorControllerServicePort,
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
    const students = await this.studentsGetter.getStudents();
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
  async createKlassesFromFolders({
    projectId,
    klasses: bodies,
  }: CreateKlassesBody): Promise<KlassDto[]> {
    await this.delay();
    const project = await this.projectsService.getProject(projectId);
    if (!project) {
      throw new Error('Project not found');
    }
    const klasses: Omit<KlassDto, 'project'>[] = [];
    for (const {
      name,
      studentPicture: { file },
    } of bodies) {
      let klass = await this.klassesDao.getByName(project.id, name);
      if (!klass) {
        klass = await this.klassesDao.save({
          name,
          projectId,
        });
        const student = await this.studentsCreator.createStudent({
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
}
