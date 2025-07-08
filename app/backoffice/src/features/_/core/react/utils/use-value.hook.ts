import { Dispatch, SetStateAction, useState } from 'react';

export type StateValue<TValue> = {
  get: TValue;
  set: Dispatch<SetStateAction<TValue>>;
};

export function useValue<TValue>(initialValue: TValue): StateValue<TValue> {
  const [get, set] = useState<TValue>(initialValue);
  return { get, set };
}
