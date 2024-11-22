import { ProjectsI18nTranslationsKeys } from '../projects.i18n-translations-keys';

export const frProjects: ProjectsI18nTranslationsKeys = {
  title: 'Projets',
  addProject: 'Ajouter un projet',
  create: {
    title: 'Créer un nouveau projet',
    form: {
      name: 'Nom du projet',
      schoolName: "Nom de l'école",
      lieu: 'Lieu',
      submit: 'Créer le projet',
      state: 'Etat',
    },
    validation: {
      name: {
        IsString: 'Le nom du projet doit être du texte',
        IsNotEmpty: 'Le nom du projet est requis',
        MaxLength: 'Le nom du projet ne peut pas dépasser 100 caractères',
      },
      schoolName: {
        IsString: "Le nom de l'école doit être du texte",
        IsNotEmpty: "Le nom de l'école est requis",
        MaxLength: "Le nom de l'école ne peut pas dépasser 100 caractères",
      },
      lieu: {
        IsString: 'Le lieu doit être du texte',
        IsNotEmpty: 'Le lieu est requis',
        MaxLength: 'Le lieu ne peut pas dépasser 100 caractères',
      },
      state: {
        IsEnum: 'État du projet invalide',
        IsNotEmpty: "L'état du projet est requis",
      },
    },
  },
} as const;
