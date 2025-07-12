import {
  AddSchoolBankAccountBody,
  BankAccountDto,
  SchoolsControllerServicePort,
} from '@domain/modules';
import { inject, singleton } from '@mygoodstack/di-react';

import { schoolsKeys } from '../getters';

import { Action } from '#action/domain';
import { CacheServicePort } from '#cache/domain';

type Body = {
  schoolId: string;
  body: AddSchoolBankAccountBody;
};

@singleton()
export class AddSchoolBankAccountAction extends Action<BankAccountDto, Body> {
  constructor(
    @inject(SchoolsControllerServicePort)
    private readonly schoolsControllerService: SchoolsControllerServicePort,
    @inject(CacheServicePort)
    private readonly cacheService: CacheServicePort,
  ) {
    super();
  }

  async execute({ schoolId, body }: Body) {
    return this.schoolsControllerService.addBankAccount(schoolId, body);
  }

  onSuccess(_data: BankAccountDto, { schoolId }: Body): void {
    this.cacheService.revalidateTag(schoolsKeys.detail(schoolId));
  }

  onError(error: Error): void {
    console.error('Failed to create school:', error);
  }
}
