import { StateValue } from '../../domain/state-value';

import { Token } from '#di/domain';
import { useService } from '#di/react';

export function useStateValue<T extends object>(
  StateValueType: Token<StateValue<T>>,
): T {
  const statevalue = useService(StateValueType);
  return statevalue.use();
}
