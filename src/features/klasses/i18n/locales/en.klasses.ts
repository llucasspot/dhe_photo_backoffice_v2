import { KlassesI18nTranslationsKeys } from '../klasses.i18n-translations-keys';

export const enKlasses: KlassesI18nTranslationsKeys = {
  title: 'Classes',
  addClass: 'Add Class',
  list: {
    error: 'Error loading classes',
    pending: 'Loading classes..',
    empty: 'No classes found',
  },
  detail: {
    title: 'Class Details',
    subtitle: 'View detailed information about this class',
    error: 'Error loading class details',
    fields: {
      name: 'Class Name',
    },
    groupPhoto: {
      title: 'Group Photos',
      dropzone: {
        instructions: 'Drop a group photo here',
        hint: 'Click or drag and drop an image file',
        dragActive: 'Drop the photo here',
      },
      list: {
        empty: 'No group photos yet',
      },
    },
  },
  create: {
    title: 'Create New Class',
    pending: 'Creating class..',
    success: 'Class created successfully!',
    error: 'Failed to create class. Please try again',
  },
} as const;
