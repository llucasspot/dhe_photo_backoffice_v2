import { Dispatch, SetStateAction, useCallback, useState } from 'react';

export type StateValue<TValue> = {
  get: () => TValue;
  set: Dispatch<SetStateAction<TValue>>;
};

export function useValue<TValue>(initialValue: TValue): StateValue<TValue> {
  const [value, setValue] = useState<TValue>(initialValue);

  const get = useCallback(() => value, [value]);

  const set = useCallback((value: SetStateAction<TValue>) => {
    return setValue(value);
  }, []);

  return { get, set };
}
