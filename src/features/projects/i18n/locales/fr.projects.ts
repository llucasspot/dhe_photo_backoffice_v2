import { ProjectsI18nTranslationsKeys } from '../projects.i18n-translations-keys';

export const frProjects: ProjectsI18nTranslationsKeys = {
  title: 'Projets',
  addProject: 'Ajouter un projet',
  create: {
    title: 'Créer un nouveau projet',
    pending: 'Création du projet en cours...',
    success: 'Projet créé avec succès !',
    error: 'Échec de la création du projet. Veuillez réessayer.',
    form: {
      name: 'Nom du projet',
      school: 'École',
      shotDate: 'Date de prise de vue',
      orderEndDate: 'Date de fin des commandes',
      messageForClients: 'Message pour les clients',
      state: 'Statut',
      submit: 'Créer le projet',
    },
    validation: {
      name: {
        IsString: 'Le nom du projet doit être du texte',
        IsNotEmpty: 'Le nom du projet est requis',
        MaxLength: 'Le nom du projet ne peut pas dépasser 100 caractères',
      },
      schoolId: {
        IsString: "L'école doit être sélectionnée",
        IsNotEmpty: "L'école est requise",
      },
      shotDate: {
        IsDate: 'Format de date de prise de vue invalide',
        IsNotEmpty: 'La date de prise de vue est requise',
      },
      orderEndDate: {
        IsDate: 'Format de date de fin des commandes invalide',
        IsNotEmpty: 'La date de fin des commandes est requise',
      },
      messageForClients: {
        IsString: 'Le message doit être du texte',
        MaxLength: 'Le message ne peut pas dépasser 500 caractères',
      },
      state: {
        IsEnum: 'Statut du projet invalide',
        IsNotEmpty: 'Le statut du projet est requis',
      },
    },
  },
} as const;
