import { KlassesDaoPort } from './daos';

import { LogAction, MockAdapter } from '#core/domain';
import { inject, singleton } from '#di';
import { KlassDto, KlassesServicePort } from '#features/klasses/domain';
import { StudentsDaoPort } from '#features/students/infra';

@singleton()
export class KlassesServiceMockAdapter
  extends MockAdapter
  implements KlassesServicePort
{
  constructor(
    @inject(KlassesDaoPort)
    private readonly klassesDao: KlassesDaoPort,
    @inject(StudentsDaoPort)
    private readonly studentsDao: StudentsDaoPort,
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
}
