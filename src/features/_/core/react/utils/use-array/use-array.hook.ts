import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { StateArray } from './state-array';

export function useArray<TItem extends { id: string }>(
  initialArray: TItem[] = [],
): StateArray<TItem> {
  const [array, setArray] = useState<TItem[]>(initialArray);

  const getAll = useCallback(() => array, [array]);

  const get = useCallback(
    (id: TItem['id']) => {
      return array.find((item) => item.id === id);
    },
    [array],
  );

  const add = useCallback((body: Omit<TItem, 'id'>) => {
    const id = uuidv4();
    const item = { ...body, id } as TItem;
    setArray((prev) => [...prev, item]);
  }, []);

  const update = useCallback(
    (id: TItem['id'], body: Partial<Omit<TItem, 'id'>>) => {
      setArray((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...body } : item)),
      );
    },
    [],
  );

  const remove = useCallback((id: TItem['id']) => {
    setArray((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clear = useCallback(() => {
    setArray([]);
  }, []);

  return {
    observable: array,
    getAll,
    get,
    add,
    update,
    remove,
    clear,
  };
}
