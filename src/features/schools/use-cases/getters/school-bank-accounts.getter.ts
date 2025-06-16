import { inject, singleton } from '@mygoodstack/di-react';

import { SchoolsControllerServicePort } from '../../domain/ports';

import { Getter } from '#action/domain';
import { BankAccountDto } from '#features/schools/domain';

export const bankAccountsKeys = {
  all: ['bank-accounts'] as const,
  lists: () => [...bankAccountsKeys.all, 'list'] as const,
  list: (filters: string) =>
    [...bankAccountsKeys.lists(), { filters }] as const,
  details: () => [...bankAccountsKeys.all, 'detail'] as const,
  detail: (id: string) => [...bankAccountsKeys.details(), id] as const,
};

@singleton()
export class SchoolBankAccountsGetter extends Getter<
  ReturnType<typeof bankAccountsKeys.lists>,
  BankAccountDto[],
  [string]
> {
  constructor(
    @inject(SchoolsControllerServicePort)
    private readonly schoolsControllerService: SchoolsControllerServicePort,
  ) {
    super(() => bankAccountsKeys.lists());
  }

  get(schoolId: string) {
    return this.schoolsControllerService.getBankAccounts(schoolId);
  }
}
