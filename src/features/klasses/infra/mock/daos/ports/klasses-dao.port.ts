import { Dao, DtoByTableName } from '#mock/domain';

export abstract class KlassesDaoPort extends Dao<DtoByTableName, 'klasses'> {
  abstract getByName(
    projectId: string,
    name: string,
  ): Promise<DtoByTableName['klasses'] | undefined>;
}
