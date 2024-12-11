export type StateArray<TItem extends { id: string }> = {
  getAll(): TItem[];
  get(id: TItem['id']): TItem | undefined;
  add(body: Omit<TItem, 'id'>): void;
  update(id: TItem['id'], body: Partial<Omit<TItem, 'id'>>): void;
  remove(id: TItem['id']): void;
  clear(): void;
};

export abstract class StateArrayy<TItem extends { id: string }> {
  abstract getAll(): TItem[];

  abstract get(id: TItem['id']): TItem | undefined;

  abstract add(body: Omit<TItem, 'id'>): void;

  abstract update(id: TItem['id'], body: Partial<Omit<TItem, 'id'>>): void;

  abstract remove(id: TItem['id']): void;

  abstract clear(): void;
}
