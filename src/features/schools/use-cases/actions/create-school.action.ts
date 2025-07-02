import { inject, singleton } from '@mygoodstack/di-react';

import { schoolsKeys } from '../getters';

import { Action } from '#action/domain';
import { CacheServicePort } from '#cache/domain';
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
    super();
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
