import { Dao } from './dao';

export abstract class MockDao<TData extends { id: string }>
  implements Dao<TData>
{
  protected readonly table: TData[];

  constructor(initialData: TData[] = []) {
    this.table = initialData;
  }

  async getAll(): Promise<TData[]> {
    return this.table;
  }

  async getById(id: string): Promise<TData | undefined> {
    return this.table.find((item) => item.id === id);
  }

  async save(entity: Omit<TData, 'id'>): Promise<TData> {
    const id = (this.table.length + 1).toString();
    const newEntity = {
      id,
      ...entity,
    } as TData;
    this.table.push(newEntity);
    return newEntity;
  }

  async saveMany(entities: Omit<TData, 'id'>[]): Promise<TData[]> {
    const res: TData[] = [];
    for (const entity of entities) {
      const newEntity = await this.save(entity);
      res.push(newEntity);
    }
    return res;
  }

  async update(
    id: string,
    updatedEntity: Partial<TData>,
  ): Promise<TData | undefined> {
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
