import { EntityTable } from 'dexie';

import { Dao } from './dao';

export abstract class DexieDao<TData extends { id: string }>
  implements Dao<TData>
{
  protected readonly entity: EntityTable<TData, 'id'>;

  constructor(entity: EntityTable<TData, 'id'>) {
    this.entity = entity;
  }

  async getAll(): Promise<TData[]> {
    return this.entity.toArray();
  }

  async getById(id: string): Promise<TData | undefined> {
    return this.entity.get({ id });
  }

  async save(body: Omit<TData, 'id'>): Promise<TData> {
    const id = await this.entity
      // @ts-expect-error save
      .add(body);
    const entity = await this.getById(id);
    return entity!;
  }

  async saveMany(entities: Omit<TData, 'id'>[]): Promise<TData[]> {
    const res: TData[] = [];
    for (const entity of entities) {
      const newEntity = await this.save(entity);
      res.push(newEntity);
    }
    return res;
  }

  async update(id: string, body: Partial<TData>): Promise<TData | undefined> {
    // @ts-expect-error update
    const updated = await this.entity.update(id, body);
    if (!updated) {
      return undefined;
    }
    const entity = await this.getById(id);
    return entity!;
  }

  async deleteById(id: string): Promise<boolean> {
    try {
      // @ts-expect-error delete
      await this.entity.delete(id);
      return true;
    } catch (err) {
      return false;
    }
  }
}
