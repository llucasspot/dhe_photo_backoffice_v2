import { ProjectDto } from '#features/projects/domain';

export enum AvailableCurrency {
  EUR = 'EUR',
}

export const availableCurrencyOptions = [
  { value: AvailableCurrency.EUR, label: AvailableCurrency.EUR },
] as const satisfies { value: AvailableCurrency; label: AvailableCurrency }[];

export interface SchoolDto {
  id: string;
  name: string;
  currency: AvailableCurrency;
  city: string;
  projects: Omit<ProjectDto, 'school'>[];
  projectIds: string[];
}
