import { FileDto } from '../../../domain/file.dto';

import { singleton } from '#di';
import { MockDao } from '#mock';

@singleton()
export class FilesMockDao extends MockDao<Omit<FileDto, ''>> {
  constructor() {
    super([]);
  }
}
