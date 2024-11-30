import { Dao, DtoByTableName } from '#mock/domain';

export abstract class PicturesDaoPort extends Dao<DtoByTableName, 'pictures'> {}
