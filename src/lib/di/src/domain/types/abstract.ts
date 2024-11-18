// eslint-disable-next-line @typescript-eslint/ban-types
export interface Abstract<T> extends Function {
  prototype: T;
}
