import { singleton } from '#di';
import { AvailableCurrency, SchoolDto } from '#features/schools/domain';
import { MockDao } from '#mock';

@singleton()
export class SchoolsMockDao extends MockDao<SchoolDto> {
  constructor() {
    super([
      {
        id: '1',
        name: 'Saint Joseph High School',
        currency: AvailableCurrency.EUR,
        city: 'Paris',
      },
      {
        id: '2',
        name: 'Lycée Victor Hugo',
        currency: AvailableCurrency.EUR,
        city: 'Lyon',
      },
      {
        id: '3',
        name: 'International School of Marseille',
        currency: AvailableCurrency.EUR,
        city: 'Marseille',
      },
    ]);
  }
}
