import { StateItems } from './use-items.hook';

export class StateItemsController {
  static getAll<TItem extends { id: string }>(state: StateItems<TItem>) {
    return Object.values<TItem>(state.get);
  }

  static get<TItem extends { id: string }>(
    state: StateItems<TItem>,
    id: TItem['id'],
  ) {
    return state.get[id] as TItem | undefined;
  }

  static add<TItem extends { id: string }>(
    state: StateItems<TItem>,
    body: TItem,
  ) {
    state.set((prev) => ({
      ...prev,
      [body.id]: state.buildItem(body),
    }));
  }

  static update<TItem extends { id: string }>(
    state: StateItems<TItem>,
    id: TItem['id'],
    body: Partial<Omit<TItem, 'id'>>,
  ) {
    const found = this.get(state, id);
    if (found) {
      state.set((prev) => ({
        ...prev,
        [id]: state.buildItem({ ...prev[id], ...body }),
      }));
    }
  }

  static remove<TItem extends { id: string }>(
    state: StateItems<TItem>,
    id: TItem['id'],
  ) {
    const found = this.get(state, id);
    if (found) {
      state.set((prev) => {
        delete prev[id];
        return { ...prev };
      });
    }
  }

  static clear<TItem extends { id: string }>(state: StateItems<TItem>) {
    state.set(() => ({}) as Record<TItem['id'], TItem>);
  }
}
