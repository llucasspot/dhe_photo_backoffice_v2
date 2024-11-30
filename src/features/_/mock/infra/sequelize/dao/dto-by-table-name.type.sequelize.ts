// const dtoBySequelizeTableName = {
//   ...dtoByTableName,
// } as const satisfies {
//   [K in string]: Type<{ id: string }>;
// };

import { DtoByTableName } from '#mock/domain';

export type DtoBySequelizeTableName = DtoByTableName;

export type SequelizeTableName = keyof DtoBySequelizeTableName;
