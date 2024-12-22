import { Dao, DtoByTableName } from '../../../domain';

export abstract class PicturesDaoPort extends Dao<DtoByTableName, 'pictures'> {}
