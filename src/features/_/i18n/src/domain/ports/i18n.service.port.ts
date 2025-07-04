import { I18nKey, TranslateOptions } from '../types';

export abstract class I18nServicePort {
  abstract translate<TI18nKey extends I18nKey>(
    key: TI18nKey,
    options?: TranslateOptions<TI18nKey>,
  ): string;
  abstract changeLanguage(lang: string): Promise<void>;
  abstract getCurrentLanguage(): string;
}
