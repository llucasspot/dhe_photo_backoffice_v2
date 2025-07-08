import { SchoolDto, SchoolsControllerServicePort } from '@domain/schools';
import { inject, singleton } from '@mygoodstack/di-react';

import { schoolsKeys } from './school.getter';

import { Getter } from '#action/domain';

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
