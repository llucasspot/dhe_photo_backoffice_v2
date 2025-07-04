import { I18nKey } from '#i18n/domain';

export abstract class GetterI<
  TCacheTags extends string[] | Readonly<string[]>,
  TData,
  TArgs extends unknown[],
> {
  abstract i18nKeys: {
    success: I18nKey;
    error: I18nKey;
    pending: I18nKey;
    empty: I18nKey;
  };

  abstract cacheTags: (...args: TArgs) => TCacheTags;

  abstract get(...args: TArgs): TData | Promise<TData>;
}

export abstract class Getter<
  TCacheTags extends string[] | Readonly<string[]>,
  TData,
  TArgs extends unknown[],
> implements GetterI<TCacheTags, TData, TArgs>
{
  public readonly i18nKeys: {
    success: I18nKey;
    pending: I18nKey;
    error: I18nKey;
    empty: I18nKey;
  };

  constructor(public readonly cacheTags: (...args: TArgs) => TCacheTags) {
    this.i18nKeys = {
      success: `getter.${this.constructor.name}.success.label` as I18nKey,
      pending: `getter.${this.constructor.name}.pending.label` as I18nKey,
      error: `getter.${this.constructor.name}.error.label` as I18nKey,
      empty: `getter.${this.constructor.name}.empty.label` as I18nKey,
    };
  }

  abstract get(...args: TArgs): TData | Promise<TData>;
}
