// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export interface Abstract<T> extends Function {
  prototype: T;
}
