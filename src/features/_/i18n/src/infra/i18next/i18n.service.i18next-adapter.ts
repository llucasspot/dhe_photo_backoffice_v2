import { initReactI18next } from 'react-i18next';
import { adapter } from '@mygoodstack/di-react';
import i18next, { Resource } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { fr } from './locales/fr';

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
          fr,
        }),
        fallbackLng: 'fr',
        compatibilityJSON: 'v4',
        supportedLngs: ['fr'],
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
