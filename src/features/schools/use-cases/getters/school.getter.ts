import { Getter } from '#action/domain';
import { inject, singleton } from '#di';
import {
  SchoolDto,
  SchoolsControllerServicePort,
} from '#features/schools/domain';

export const schoolsKeys = {
  all: ['schools'] as const,
  lists: () => [...schoolsKeys.all, 'list'] as const,
  list: (filters: string) => [...schoolsKeys.lists(), { filters }] as const,
  details: () => [...schoolsKeys.all, 'detail'] as const,
  detail: (id: string) => [...schoolsKeys.details(), id] as const,
};

@singleton()
export class SchoolGetter extends Getter<
  ReturnType<typeof schoolsKeys.detail>,
  SchoolDto,
  [string]
> {
  constructor(
    @inject(SchoolsControllerServicePort)
    private readonly schoolsControllerService: SchoolsControllerServicePort,
  ) {
    super((id) => schoolsKeys.detail(id));
  }

  get(id: string) {
    return this.schoolsControllerService.getSchool(id);
  }
}
