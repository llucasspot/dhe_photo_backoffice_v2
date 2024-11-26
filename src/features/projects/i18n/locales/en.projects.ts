import { ProjectsI18nTranslationsKeys } from '../projects.i18n-translations-keys';

export const enProjects: ProjectsI18nTranslationsKeys = {
  title: 'Projects',
  addProject: 'Add Project',
  list: {
    error: 'Error loading projects.',
    pending: 'Loading projects...',
    empty: 'No projects found.',
  },
  detail: {
    title: 'Project Details',
    subtitle: 'View detailed information about this project.',
    error: 'Error loading project details.',
    dropzone: {
      instructions: 'Drop a folder containing class folders here',
      hint: 'Each subfolder will create a new class',
      dragActive: 'Drop the folder here',
    },
    klasses: {
      title: 'Classes',
      creating: 'Creating classes...',
      created: 'Classes created successfully!',
      error: 'Failed to create classes. Please try again.',
    },
    fields: {
      name: 'Project Name',
      school: 'School',
      shotDate: 'Shooting Date',
      orderEndDate: 'Order End Date',
      status: 'Status',
      messageForClients: 'Message for Clients',
    },
  },
  create: {
    title: 'Create New Project',
    pending: 'Creating project...',
    success: 'Project created successfully!',
    error: 'Failed to create project. Please try again.',
    form: {
      name: 'Project Name',
      school: 'School',
      shotDate: 'Shooting Date',
      orderEndDate: 'Order End Date',
      messageForClients: 'Message for Clients',
      state: 'Status',
      submit: 'Create Project',
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
      shotDate: {
        IsDate: 'Invalid shooting date format',
        IsNotEmpty: 'Shooting date is required',
      },
      orderEndDate: {
        IsDate: 'Invalid order end date format',
        IsNotEmpty: 'Order end date is required',
      },
      messageForClients: {
        IsString: 'Message must be text',
        MaxLength: 'Message cannot exceed 500 characters',
      },
      state: {
        IsEnum: 'Invalid project status',
        IsNotEmpty: 'Project status is required',
      },
    },
  },
};
