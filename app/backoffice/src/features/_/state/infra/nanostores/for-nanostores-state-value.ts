import { useStore } from '@nanostores/react';
import { atom, PreinitializedWritableAtom } from 'nanostores';

import { StateValue } from '../../domain/state-value';

export abstract class ForNanostoresStateValue<T extends object>
  implements StateValue<T>
{
  private stateValue: PreinitializedWritableAtom<T>;

  constructor(private readonly initValue: T) {
    this.stateValue = atom<T>(this.initValue);
  }

  get(): T {
    return this.stateValue.get();
  }

  set(newValue: T): void {
    this.stateValue.set(newValue);
  }

  use(): T {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useStore(this.stateValue);
  }
}
