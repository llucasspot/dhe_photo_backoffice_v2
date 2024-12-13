import { useValue } from '../use-value.hook';

import { plainToInstance } from '#class-transformer';
import { Type } from '#di/domain';

function transformArrayToRecord<TItem extends { id: string }>(
  items: TItem[],
): Record<TItem['id'], TItem> {
  return items.reduce(
    (acc, item) => {
      // @ts-expect-error acc[item.id]
      acc[item.id] = item;
      return acc;
    },
    {} as Record<TItem['id'], TItem>,
  );
}

export type StateItems<TItem extends { id: string }> = ReturnType<
  typeof useItems<TItem>
>;

export function useItems<TItem extends { id: string }>(
  Type: Type<TItem>,
  initialArray: TItem[] = [],
) {
  const { get, set } = useValue(transformArrayToRecord(initialArray));
  const buildItem = (item: TItem) => plainToInstance(Type, item);
  return {
    get,
    set,
    buildItem,
  };
}
