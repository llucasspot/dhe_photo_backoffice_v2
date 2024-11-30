import { Dao, DtoByTableName, Finder } from '../../domain';

export abstract class MockDao<
  TDtoByTableName extends DtoByTableName,
  TTableName extends keyof TDtoByTableName,
> implements Dao<TDtoByTableName, TTableName>
{
  protected readonly table: TDtoByTableName[TTableName][];

  constructor(initialData: TDtoByTableName[TTableName][] = []) {
    this.table = initialData;
  }

  getAll(): Promise<TDtoByTableName[TTableName][]>;
  getAll<TPopulatedEntity extends TDtoByTableName[TTableName]>(
    finder: Finder<TDtoByTableName, TTableName, TPopulatedEntity>,
  ): Promise<TPopulatedEntity[]>;
  async getAll<TPopulatedEntity extends TDtoByTableName[TTableName]>(
    finder?: Finder<TDtoByTableName, TTableName, TPopulatedEntity>,
  ): Promise<TDtoByTableName[TTableName][] | TPopulatedEntity[]> {
    console.log('[MockDao] [getAll] ', finder);
    return this.table;
  }

  async getById(id: string): Promise<TDtoByTableName[TTableName] | undefined> {
    return this.table.find((item) => (item as { id: string }).id === id);
  }

  get(): Promise<TDtoByTableName[TTableName] | null>;
  get<TPopulatedEntity extends TDtoByTableName[TTableName]>(
    finder: Finder<TDtoByTableName, TTableName, TPopulatedEntity>,
  ): Promise<TPopulatedEntity | null | undefined>;
  async get<TPopulatedEntity extends TDtoByTableName[TTableName]>(
    finder?: Finder<TDtoByTableName, TTableName, TPopulatedEntity>,
  ): Promise<
    TDtoByTableName[TTableName] | TPopulatedEntity | null | undefined
  > {
    console.log('[MockDao] [get] ', finder);
    throw new Error('Method not implemented.');
  }

  async save(
    entity: Omit<TDtoByTableName[TTableName], 'id'>,
  ): Promise<TDtoByTableName[TTableName]> {
    const id = (this.table.length + 1).toString();
    const newEntity = {
      id,
      ...entity,
    } as TDtoByTableName[TTableName];
    this.table.push(newEntity);
    return newEntity;
  }

  async saveMany(
    entities: Omit<TDtoByTableName[TTableName], 'id'>[],
  ): Promise<TDtoByTableName[TTableName][]> {
    const res: TDtoByTableName[TTableName][] = [];
    for (const entity of entities) {
      const newEntity = await this.save(entity);
      res.push(newEntity);
    }
    return res;
  }

  async update(
    id: string,
    updatedEntity: Partial<TDtoByTableName[TTableName]>,
  ): Promise<TDtoByTableName[TTableName] | undefined> {
    const index = this.table.findIndex(
      (item) => (item as { id: string }).id === id,
    );
    if (index === -1) {
      return undefined;
    }
    this.table[index] = { ...this.table[index], ...updatedEntity };
    return this.table[index];
  }

  async deleteById(id: string): Promise<boolean> {
    const index = this.table.findIndex(
      (item) => (item as { id: string }).id === id,
    );
    if (index !== -1) {
      this.table.splice(index, 1);
      return true;
    }
    return false;
  }
}
