import { ProjectsI18nTranslationsKeys } from '../projects.i18n-translations-keys';

export const enProjects: ProjectsI18nTranslationsKeys = {
  title: 'Projects',
  addProject: 'Add Project',
  create: {
    title: 'Create New Project',
    form: {
      name: 'Project Name',
      school: 'School',
      lieu: 'Location',
      submit: 'Create Project',
      state: 'State',
    },
    validation: {
      name: {
        IsString: 'Project name must be text',
        IsNotEmpty: 'Project name is required',
        MaxLength: 'Project name cannot exceed 100 characters',
      },
      schoolId: {
        IsString: 'School must be selected',
        IsNotEmpty: 'School is required',
      },
      lieu: {
        IsString: 'Location must be text',
        IsNotEmpty: 'Location is required',
        MaxLength: 'Location cannot exceed 100 characters',
      },
      state: {
        IsEnum: 'Invalid project state',
        IsNotEmpty: 'Project state is required',
      },
    },
  },
} as const;
