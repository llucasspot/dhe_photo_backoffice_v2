import { StudentsI18nTranslationsKeys } from '../students.i18n-translations-keys';

export const enStudents: StudentsI18nTranslationsKeys = {
  title: 'Students',
  addStudent: 'Add Student',
  list: {
    error: 'Error loading students.',
    pending: 'Loading students...',
    empty: 'No students found.',
  },
  detail: {
    title: 'Student Details',
    subtitle: 'View detailed information about this student.',
    error: 'Error loading student details.',
    fields: {
      name: 'Student Name',
    },
  },
  create: {
    title: 'Create New Student',
    pending: 'Creating student...',
    success: 'Student created successfully!',
    error: 'Failed to create student. Please try again.',
    form: {
      name: 'Student Name',
      submit: 'Create Student',
    },
    validation: {
      name: {
        IsString: 'Student name must be text',
        IsNotEmpty: 'Student name is required',
        MaxLength: 'Student name cannot exceed 100 characters',
      },
    },
  },
} as const;
