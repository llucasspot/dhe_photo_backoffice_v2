import { initReactI18next } from 'react-i18next';
import i18next, { Resource } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { en } from './locales/en';
import { fr } from './locales/fr';

import { adapter } from '#di';
import { I18nServicePort, TranslateOptions, Translations } from '#i18n/domain';

@adapter(I18nServicePort)
export class I18nServiceI18nextAdapter implements I18nServicePort {
  constructor() {
    this.initializeI18n();
  }

  translate(key: string, options?: TranslateOptions): string {
    return i18next.t(key, options);
  }

  async changeLanguage(lang: string): Promise<void> {
    await i18next.changeLanguage(lang);
  }

  getCurrentLanguage(): string {
    return i18next.language;
  }

  private async initializeI18n() {
    await i18next
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        resources: this.buildResources({
          en,
          fr,
        }),
        fallbackLng: 'en',
        compatibilityJSON: 'v4',
        supportedLngs: ['fr', 'en'],
        interpolation: {
          escapeValue: false,
        },
      });
  }

  private buildResources(record: Record<string, Translations>) {
    const resources: Resource = {};
    Object.entries(record).forEach(([key, value]) => {
      resources[key] = {
        translation: value,
      };
    });
    return resources;
  }
}
