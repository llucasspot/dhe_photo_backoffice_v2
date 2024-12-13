import { useState } from 'react';

import { plainToInstance } from '#class-transformer';
import { StateValue } from '#core/react';
import { Type } from '#di/domain';

export function useItem<TItem extends object>(
  Type: Type<TItem>,
  initialValue: TItem | null,
): StateValue<TItem | null> {
  const [get, setItem] = useState<TItem | null>(initialValue);
  const buildItem = (item: TItem | null) => plainToInstance(Type, item);

  const set: typeof setItem = (valueOrUpdater) => {
    if (typeof valueOrUpdater === 'function') {
      setItem((prev) => {
        const updatedValue = valueOrUpdater(prev);
        return buildItem(updatedValue);
      });
    } else {
      const instance = buildItem(valueOrUpdater);
      setItem(instance);
    }
  };

  return { get, set };
}
