import { DtoByTableName } from '../../../domain';

export type DtoBySequelizeTableName = DtoByTableName;

export type SequelizeTableName = keyof DtoBySequelizeTableName;
