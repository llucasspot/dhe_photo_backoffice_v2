export abstract class Dao<TData extends { id: string }> {
  abstract getAll(): Promise<TData[]>;

  abstract getById(id: string): Promise<TData | undefined>;

  abstract save(body: Omit<TData, 'id'>): Promise<TData>;

  abstract saveMany(bodies: Omit<TData, 'id'>[]): Promise<TData[]>;

  abstract update(id: string, body: Partial<TData>): Promise<TData | undefined>;

  abstract deleteById(id: string): Promise<boolean>;
}
