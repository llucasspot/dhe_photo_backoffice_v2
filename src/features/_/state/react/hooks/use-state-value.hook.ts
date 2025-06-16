import { useInstance } from '@mygoodstack/di-react/dist';

import { StateValue } from '../../domain/state-value';

import { Token } from '#di/domain';

export function useStateValue<T extends object>(
  StateValueType: Token<StateValue<T>>,
): T {
  const statevalue = useInstance(StateValueType);
  return statevalue.use();
}
