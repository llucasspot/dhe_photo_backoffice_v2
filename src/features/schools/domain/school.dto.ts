import { OmitType } from '#@nestjs/mapped-types';
import { plainToInstance } from '#class-transformer';
import { Dto } from '#core/domain';
import { SchoolProject } from '#features/projects/domain';

export enum AvailableCurrency {
  EUR = 'EUR',
}

export class SchoolDto extends Dto<SchoolDto> {
  // properties
  id!: string;
  name!: string;
  currency!: AvailableCurrency;
  city!: string;
  // relationships
  projects: SchoolProject[] = [];

  get projectIds(): string[] {
    return this.projects.map((project) => project.id);
  }

  static availableCurrencyOptions = [
    { value: AvailableCurrency.EUR, label: AvailableCurrency.EUR },
  ] as const satisfies { value: AvailableCurrency; label: AvailableCurrency }[];

  static build<TBody>(body: TBody[]): SchoolDto[];
  static build<TBody>(body: TBody): SchoolDto;
  static build(body: unknown): SchoolDto | SchoolDto[] {
    return plainToInstance(this, body);
  }
}

export class ProjectSchool extends OmitType(SchoolDto, [
  'projects',
  'projectIds',
]) {}
