import { SchoolsI18nTranslationsKeys } from '../schools.i18n-translations-keys';

export const enSchools: SchoolsI18nTranslationsKeys = {
  title: 'Schools',
  addSchool: 'Add School',
  create: {
    title: 'Create New School',
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
