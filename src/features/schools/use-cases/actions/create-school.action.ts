import { schoolsKeys } from '../getters';

import { Action } from '#action/domain';
import { CacheServicePort } from '#cache/domain';
import { inject, singleton } from '#di';
import {
  CreateSchoolBody,
  SchoolDto,
  SchoolsControllerServicePort,
} from '#features/schools/domain';

@singleton()
export class CreateSchoolAction extends Action<SchoolDto, CreateSchoolBody> {
  constructor(
    @inject(SchoolsControllerServicePort)
    private readonly schoolsControllerService: SchoolsControllerServicePort,
    @inject(CacheServicePort)
    private readonly cacheService: CacheServicePort,
  ) {
    super({
      success: 'schools.create.success',
      pending: 'schools.create.pending',
      error: 'schools.create.error',
    });
  }

  async execute(body: CreateSchoolBody) {
    return this.schoolsControllerService.createSchool(body);
  }

  onSuccess(): void {
    this.cacheService.revalidateTag(schoolsKeys.lists());
  }

  onError(error: Error): void {
    console.error('Failed to create school:', error);
  }
}
