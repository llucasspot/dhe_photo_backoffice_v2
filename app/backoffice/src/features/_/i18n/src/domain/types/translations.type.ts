import { fr } from '../../infra/i18next/locales/fr';

export type I18nTranslation = typeof fr;

// ----- //

type DotPrefix<TPrefix extends string, TKey extends string> = TPrefix extends ''
  ? TKey
  : `${TPrefix}.${TKey}`;

type NestedKeys<TTranslations, TI18nKey extends string = ''> = {
  [K in keyof TTranslations]: TTranslations[K] extends object
    ? NestedKeys<TTranslations[K], DotPrefix<TI18nKey, Extract<K, string>>>
    : DotPrefix<TI18nKey, Extract<K, string>>;
}[keyof TTranslations];

export type I18nKey = NestedKeys<I18nTranslation>;
export type I18nDtoName = keyof I18nTranslation['dto'];
export type I18nFormName = keyof I18nTranslation['form'];
export type I18nActionName = keyof I18nTranslation['action'];
export type I18nGetterName = keyof I18nTranslation['getter'];

// ----- //

type ExtractPlaceholders<T extends string> =
  T extends `${string}{{${infer Var}}}${infer Rest}`
    ? Var | ExtractPlaceholders<Rest>
    : never;

type Split<
  S extends string,
  Delimiter extends string,
> = S extends `${infer Head}${Delimiter}${infer Tail}`
  ? [Head, ...Split<Tail, Delimiter>]
  : [S];

type GetByPath<T, Path extends readonly string[]> = Path extends [
  infer Head extends keyof T,
  ...infer Rest extends string[],
]
  ? GetByPath<T[Head], Rest>
  : T;

type TranslateStringFromKey<TI18nKey extends I18nKey> =
  GetByPath<
    I18nTranslation,
    // @ts-expect-error Split
    Split<TI18nKey, '.'>
  > extends string
    ? GetByPath<
        I18nTranslation,
        // @ts-expect-error Split
        Split<TI18nKey, '.'>
      >
    : never;

export type TranslateOptions<TI18nKey extends I18nKey> =
  ExtractPlaceholders<TranslateStringFromKey<TI18nKey>> extends never
    ? undefined
    : { [P in ExtractPlaceholders<TranslateStringFromKey<TI18nKey>>]: string };
