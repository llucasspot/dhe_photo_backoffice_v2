import { SchoolsServiceControllerServicePort } from '../../domain/ports';

import { schoolsKeys } from './school.getter';

import { Getter } from '#action/domain';
import { inject, singleton } from '#di';
import { SchoolDto } from '#features/schools/domain';

@singleton()
export class SchoolsGetter extends Getter<
  ReturnType<typeof schoolsKeys.lists>,
  SchoolDto[],
  []
> {
  constructor(
    @inject(SchoolsServiceControllerServicePort)
    private readonly schoolsServiceControllerService: SchoolsServiceControllerServicePort,
  ) {
    super(() => schoolsKeys.lists());
  }

  get() {
    return this.schoolsServiceControllerService.getSchools();
  }
}
