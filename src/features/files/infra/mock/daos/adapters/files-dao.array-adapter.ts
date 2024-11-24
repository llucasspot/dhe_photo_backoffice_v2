import { FilesDaoPort } from '../ports';

import { singleton } from '#di';
import { FileDto } from '#features/files/domain';
import { MockDao } from '#mock';

@singleton()
export class FilesDaoDexieAdapter
  extends MockDao<Omit<FileDto, ''>>
  implements FilesDaoPort
{
  constructor() {
    super([]);
  }
}
