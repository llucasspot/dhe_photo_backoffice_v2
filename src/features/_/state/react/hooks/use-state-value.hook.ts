import { Token, useInstance } from '@mygoodstack/di-react';

import { StateValue } from '../../domain/state-value';

export function useStateValue<T extends object>(
  StateValueType: Token<StateValue<T>>,
): T {
  const statevalue = useInstance(StateValueType);
  return statevalue.use();
}
