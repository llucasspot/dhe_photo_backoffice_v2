import { frAuth } from '#features/auth/i18n';
import { frProjects } from '#features/projects/i18n';
import { frSettings } from '#features/settings/i18n';
import { Translations } from '#i18n/domain';

export const fr: Translations = {
  auth: frAuth,
  settings: frSettings,
  projects: frProjects,
  navigation: {
    dashboard: 'Tableau de bord',
    schools: 'Écoles',
    projects: 'Projets',
    signIn: 'Se connecter',
    signUp: "S'inscrire",
    signOut: 'Se déconnecter',
    settings: 'Paramètres',
  },
  common: {
    actions: {
      add: 'Ajouter',
      cancel: 'Annuler',
    },
    status: {
      active: 'Actif',
      inactive: 'Inactif',
      published: 'Publié',
      unpublished: 'Non publié',
    },
  },
  schools: {
    title: 'Écoles',
    addSchool: 'Ajouter une école',
    list: {
      students: 'élèves',
      type: {
        public: 'publique',
        private: 'privée',
      },
    },
  },
  dashboard: {
    title: 'Tableau de bord',
    welcome: 'Bienvenue sur votre tableau de bord !',
  },
  home: {
    title: 'Bienvenue sur Notre Application',
    subtitle:
      'Commencez par créer un compte ou connectez-vous si vous en avez déjà un.',
  },
} as const;
