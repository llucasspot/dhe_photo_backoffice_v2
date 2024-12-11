import { useCallback, useState } from 'react';

import { StateArray } from './state-array';

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
): StateArray<TItem> {
  const [record, setRecord] = useState<Record<TItem['id'], TItem>>(
    transformArrayToRecord(initialArray),
  );

  const getAll = useCallback(() => Object.values<TItem>(record), [record]);

  const get = useCallback(
    (id: TItem['id']) => {
      return record[id];
    },
    [record],
  );

  const add = useCallback((body: TItem) => {
    setRecord((prev) => ({ ...prev, [body.id]: body }));
  }, []);

  const update = useCallback(
    (id: TItem['id'], body: Partial<Omit<TItem, 'id'>>) => {
      const found: TItem = record[id];
      if (found) {
        setRecord((prev) => ({ ...prev, [id]: { ...prev[id], ...body } }));
      }
    },
    [record],
  );

  const remove = useCallback(
    (id: TItem['id']) => {
      const found: TItem = record[id];
      if (found) {
        setRecord((prev) => {
          delete prev[id];
          return { ...prev };
        });
      }
    },
    [record],
  );

  const clear = useCallback(() => {
    setRecord({} as Record<TItem['id'], TItem>);
  }, []);

  return {
    getAll,
    get,
    add,
    update,
    remove,
    clear,
  };
}
