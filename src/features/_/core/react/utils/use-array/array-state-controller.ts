import { StateValue } from '../use-value.hook';

export type ObjectArrayState<TItem extends { id: string }> = StateValue<
  Record<TItem['id'], TItem>
>;

export class ArrayStateController {
  static getAll<TItem extends { id: string }>(state: ObjectArrayState<TItem>) {
    return Object.values<TItem>(state.get);
  }

  static get<TItem extends { id: string }>(
    state: ObjectArrayState<TItem>,
    id: TItem['id'],
  ) {
    return state.get[id] as TItem | undefined;
  }

  static add<TItem extends { id: string }>(
    state: ObjectArrayState<TItem>,
    body: TItem,
  ) {
    state.set((prev) => ({ ...prev, [body.id]: body }));
  }

  static update<TItem extends { id: string }>(
    state: ObjectArrayState<TItem>,
    id: TItem['id'],
    body: Partial<Omit<TItem, 'id'>>,
  ) {
    const found = this.get(state, id);
    if (found) {
      state.set((prev) => ({ ...prev, [id]: { ...prev[id], ...body } }));
    }
  }

  static remove<TItem extends { id: string }>(
    state: ObjectArrayState<TItem>,
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

  static clear<TItem extends { id: string }>(state: ObjectArrayState<TItem>) {
    state.set(() => ({}) as Record<TItem['id'], TItem>);
  }
}
