import { SchoolsI18nTranslationsKeys } from '../schools.i18n-translations-keys';

export const enSchools: SchoolsI18nTranslationsKeys = {
  title: 'Schools',
  addSchool: 'Add School',
  create: {
    title: 'Create New School',
    form: {
      name: 'School Name',
      location: 'Location',
      type: 'School Type',
      studentCount: 'Number of Students',
      submit: 'Create School',
    },
    validation: {
      name: {
        IsString: 'School name must be text',
        IsNotEmpty: 'School name is required',
        MaxLength: 'School name cannot exceed 100 characters',
      },
      location: {
        IsString: 'Location must be text',
        IsNotEmpty: 'Location is required',
        MaxLength: 'Location cannot exceed 100 characters',
      },
      type: {
        IsEnum: 'Invalid school type',
        IsNotEmpty: 'School type is required',
      },
      status: {
        IsEnum: 'Invalid school status',
        IsNotEmpty: 'School status is required',
      },
      studentCount: {
        IsNumber: 'Student count must be a number',
        Min: 'Student count must be at least 0',
        IsNotEmpty: 'Student count is required',
      },
    },
  },
  list: {
    students: 'students',
    type: {
      public: 'public',
      private: 'private',
    },
    status: {
      active: 'active',
      inactive: 'inactive',
    },
  },
} as const;
