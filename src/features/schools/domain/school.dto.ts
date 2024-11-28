import { Dto, OmitType } from '#core/domain';
import { SchoolProject } from '#features/projects/domain';

export enum AvailableCurrency {
  EUR = 'EUR',
}

export const availableCurrencyOptions = [
  { value: AvailableCurrency.EUR, label: AvailableCurrency.EUR },
] as const satisfies { value: AvailableCurrency; label: AvailableCurrency }[];

export class SchoolDto extends Dto<SchoolDto> {
  // properties
  id!: string;
  name!: string;
  currency!: AvailableCurrency;
  city!: string;
  // relationships
  projects: SchoolProject[] = [];
  projectIds: string[] = [];
}

export class ProjectSchool extends OmitType(SchoolDto, [
  'projects',
  'projectIds',
]) {}
