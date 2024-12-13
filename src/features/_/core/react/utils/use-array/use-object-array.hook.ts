import { useValue } from '../use-value.hook';

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

export function useObjectArray<TItem extends { id: string }>(
  initialArray: TItem[] = [],
) {
  return useValue(transformArrayToRecord(initialArray));
}
