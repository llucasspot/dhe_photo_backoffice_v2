import { TranslateOptions } from '../types';

export abstract class I18nServicePort {
  abstract translate(key: string, options?: TranslateOptions): string;
  abstract changeLanguage(lang: string): Promise<void>;
  abstract getCurrentLanguage(): string;
}
