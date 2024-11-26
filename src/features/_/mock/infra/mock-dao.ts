import { Finder } from '../daos';
import { DtoByTableName } from '../daos';
import { Dao } from '../daos';

export abstract class MockDao<TTableName extends keyof DtoByTableName>
  implements Dao<TTableName>
{
  protected readonly table: DtoByTableName[TTableName][];

  constructor(initialData: DtoByTableName[TTableName][] = []) {
    this.table = initialData;
  }

  async getAll<TPopulatedEntity extends DtoByTableName[TTableName]>(
    finder?: Finder<TTableName, TPopulatedEntity>,
  ): Promise<DtoByTableName[TTableName][] | TPopulatedEntity[]> {
    console.log('[MockDao] [getAll] ', finder);
    return this.table;
  }

  async getById(id: string): Promise<DtoByTableName[TTableName] | undefined> {
    return this.table.find((item) => item.id === id);
  }

  get<TPopulatedEntity extends DtoByTableName[TTableName]>(
    finder?: Finder<TTableName, TPopulatedEntity>,
  ): Promise<DtoByTableName[TTableName] | TPopulatedEntity | undefined> {
    console.log('[MockDao] [get] ', finder);
    throw new Error('Method not implemented.');
  }

  async save(
    entity: Omit<DtoByTableName[TTableName], 'id'>,
  ): Promise<DtoByTableName[TTableName]> {
    const id = (this.table.length + 1).toString();
    const newEntity = {
      id,
      ...entity,
    } as DtoByTableName[TTableName];
    this.table.push(newEntity);
    return newEntity;
  }

  async saveMany(
    entities: Omit<DtoByTableName[TTableName], 'id'>[],
  ): Promise<DtoByTableName[TTableName][]> {
    const res: DtoByTableName[TTableName][] = [];
    for (const entity of entities) {
      const newEntity = await this.save(entity);
      res.push(newEntity);
    }
    return res;
  }

  async update(
    id: string,
    updatedEntity: Partial<DtoByTableName[TTableName]>,
  ): Promise<DtoByTableName[TTableName] | undefined> {
    const index = this.table.findIndex((item) => item.id === id);
    if (index === -1) {
      return undefined;
    }
    this.table[index] = { ...this.table[index], ...updatedEntity };
    return this.table[index];
  }

  async deleteById(id: string): Promise<boolean> {
    const index = this.table.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.table.splice(index, 1);
      return true;
    }
    return false;
  }
}
