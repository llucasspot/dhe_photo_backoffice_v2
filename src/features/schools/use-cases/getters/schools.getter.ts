import { inject, singleton } from '@mygoodstack/di-react/dist';

import { SchoolsControllerServicePort } from '../../domain/ports';

import { schoolsKeys } from './school.getter';

import { Getter } from '#action/domain';
import { SchoolDto } from '#features/schools/domain';

@singleton()
export class SchoolsGetter extends Getter<
  ReturnType<typeof schoolsKeys.lists>,
  SchoolDto[],
  []
> {
  constructor(
    @inject(SchoolsControllerServicePort)
    private readonly schoolsControllerService: SchoolsControllerServicePort,
  ) {
    super(() => schoolsKeys.lists());
  }

  get() {
    return this.schoolsControllerService.getSchools();
  }
}
