export abstract class LocalGetter<TData, TArgs extends unknown[] = []> {
  abstract get(...args: TArgs): TData | Promise<TData>;
}
