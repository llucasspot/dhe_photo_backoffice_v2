import { KlassesI18nTranslationsKeys } from '../klasses.i18n-translations-keys';

export const enKlasses: KlassesI18nTranslationsKeys = {
  title: 'Classes',
  addClass: 'Add Class',
  list: {
    error: 'Error loading classes.',
    pending: 'Loading classes...',
    empty: 'No classes found.',
  },
  detail: {
    title: 'Class Details',
    subtitle: 'View detailed information about this class.',
    error: 'Error loading class details.',
    fields: {
      name: 'Class Name',
    },
  },
  create: {
    title: 'Create New Class',
    pending: 'Creating class...',
    success: 'Class created successfully!',
    error: 'Failed to create class. Please try again.',
  },
} as const;
