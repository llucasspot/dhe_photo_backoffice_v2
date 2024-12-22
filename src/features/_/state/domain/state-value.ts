export abstract class StateValue<T extends object> {
  abstract get(): T;

  abstract set(newValue: T): void;

  abstract use(): T;
}
