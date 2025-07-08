import { Dto } from '@domain/core';
import { IsOptional } from 'class-validator';

import { BankAccountDto } from './bank-account.dto';

export enum AvailableCurrency {
  EUR = 'EUR',
}

export class SchoolDto extends Dto<SchoolDto> {
  static availableCurrencyOptions = [
    { value: AvailableCurrency.EUR, label: AvailableCurrency.EUR },
  ] as const satisfies { value: AvailableCurrency; label: AvailableCurrency }[];
  // properties
  id!: string;
  name!: string;
  currency!: AvailableCurrency;
  city!: string;
  // relationships
  projects: SchoolProject[] = [];
  bankAccounts: BankAccountDto[] = [];
}

// --- project ---

export enum ProjectState {
  Published = 'published',
  Unpublished = 'unpublished',
}

export class SchoolProject extends Dto<SchoolProject> {
  id!: string;
  schoolId!: string;
  name!: string;
  shotDate!: Date;
  orderEndDate!: Date;
  @IsOptional()
  messageForClients?: string;
  state!: ProjectState;
}
