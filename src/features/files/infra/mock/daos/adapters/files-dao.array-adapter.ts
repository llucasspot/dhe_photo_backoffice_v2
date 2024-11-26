import { FilesDaoPort } from '../ports';

import { singleton } from '#di';
import { MockDao } from '#mock';

@singleton()
export class FilesDaoArrayAdapter
  extends MockDao<'files'>
  implements FilesDaoPort
{
  constructor() {
    super([]);
  }
}
