export abstract class GetterI<
  TCacheTags extends string[] | Readonly<string[]>,
  TData,
  TArgs extends unknown[],
> {
  abstract cacheTags: (...args: TArgs) => TCacheTags;

  abstract get(...args: TArgs): TData | Promise<TData>;
}

export abstract class Getter<
  TCacheTags extends string[] | Readonly<string[]>,
  TData,
  TArgs extends unknown[],
> implements GetterI<TCacheTags, TData, TArgs>
{
  constructor(public readonly cacheTags: (...args: TArgs) => TCacheTags) {}

  abstract get(...args: TArgs): TData | Promise<TData>;
}
