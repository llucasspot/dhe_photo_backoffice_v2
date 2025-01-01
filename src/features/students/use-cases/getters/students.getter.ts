import { Getter } from '#action/domain';
import { inject, singleton } from '#di';
import {
  KlassStudentsGetterControllerServicePort,
  StudentDto,
} from '#features/students/domain';

export const studentsKeys = {
  all: ['students'] as const,
  lists: () => [...studentsKeys.all, 'list'] as const,
  list: (klassId: string) => [...studentsKeys.lists(), klassId] as const,
  details: () => [...studentsKeys.all, 'detail'] as const,
  detail: (id: string) => [...studentsKeys.details(), id] as const,
};

@singleton()
export class StudentsGetter extends Getter<
  ReturnType<typeof studentsKeys.list>,
  StudentDto[],
  [{ klassId: string }]
> {
  constructor(
    @inject(KlassStudentsGetterControllerServicePort)
    private readonly klassStudentsGetterControllerService: KlassStudentsGetterControllerServicePort,
  ) {
    super(({ klassId }: { klassId: string }) => studentsKeys.list(klassId));
  }

  get({ klassId }: { klassId: string }) {
    return this.klassStudentsGetterControllerService.getStudents(klassId);
  }
}
