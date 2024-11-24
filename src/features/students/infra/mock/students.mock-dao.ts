import { singleton } from '#di';
import { StudentDto } from '#features/students/domain';
import { MockDao } from '#mock';

@singleton()
export class StudentsMockDao extends MockDao<Omit<StudentDto, ''>> {
  constructor() {
    super([]);
  }
}
