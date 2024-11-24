export abstract class MockDao<TData extends { id: string }> {
  protected readonly table: TData[];

  constructor(initialData: TData[] = []) {
    this.table = initialData;
  }

  getAll(): TData[] {
    return this.table;
  }

  getById(id: string): TData | undefined {
    return this.table.find((item) => item.id === id);
  }

  save(entity: Omit<TData, 'id'>): TData {
    const id = (this.table.length + 1).toString();
    const newEntity = {
      id,
      ...entity,
    } as TData;
    this.table.push(newEntity);
    return newEntity;
  }

  saveMany(entities: Omit<TData, 'id'>[]): TData[] {
    const res: TData[] = [];
    for (const entity of entities) {
      const newEntity = this.save(entity);
      res.push(newEntity);
    }
    return res;
  }

  update(id: string, updatedEntity: Partial<TData>): TData | undefined {
    const index = this.table.findIndex((item) => item.id === id);
    if (index === -1) {
      return undefined;
    }
    this.table[index] = { ...this.table[index], ...updatedEntity };
    return this.table[index];
  }

  deleteById(id: string): boolean {
    const index = this.table.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.table.splice(index, 1);
      return true;
    }
    return false;
  }
}
