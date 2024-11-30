import { Dto } from '#core/domain';
import { DtoByTableName } from '#mock/domain';

// const dtoByDexieTableName = {
//   ...dtoByTableName,
//   dexieFileData: DexieFileData,
// } as const satisfies {
//   [K in string]: Type<{ id: string }>;
// };

export class DexieFileData extends Dto<DexieFileData> {
  //properties
  id!: string;
  pictureId!: string;
  blob!: Blob;
}

export type DtoByDexieTableName = DtoByTableName & {
  dexieFileData: DexieFileData;
};

export type DexieTableName = keyof DtoByDexieTableName;
