import { SchoolsI18nTranslationsKeys } from '../schools.i18n-translations-keys';

export const enSchools: SchoolsI18nTranslationsKeys = {
  title: 'Schools',
  addSchool: 'Add School',
  list: {
    error: 'Error loading schools.',
    pending: 'Loading schools...',
    empty: 'No schools found.',
  },
  detail: {
    title: 'School Details',
    subtitle: 'View detailed information about this school.',
    error: 'Error loading school details.',
    fields: {
      name: 'School Name',
      currency: 'Currency',
      city: 'City',
    },
  },
  create: {
    title: 'Create New School',
    pending: 'Creating school...',
    success: 'School created successfully!',
    error: 'Failed to create school. Please try again.',
    form: {
      name: 'School Name',
      currency: 'Currency',
      city: 'City',
      submit: 'Create School',
    },
    validation: {
      name: {
        IsString: 'School name must be text',
        IsNotEmpty: 'School name is required',
        MaxLength: 'School name cannot exceed 100 characters',
      },
      currency: {
        IsEnum: 'Currency must be EUR',
        IsNotEmpty: 'Currency is required',
      },
      city: {
        IsString: 'City must be text',
        IsNotEmpty: 'City is required',
        MaxLength: 'City name cannot exceed 100 characters',
      },
    },
  },
} as const;
