import { frAuth } from '#features/auth/i18n';
import { frKlasses } from '#features/klasses/i18n';
import { frProducts } from '#features/products/i18n';
import { frProjects } from '#features/projects/i18n';
import { frSchools } from '#features/schools/i18n';
import { frSettings } from '#features/settings/i18n';
import { frStudents } from '#features/students/i18n';

export const fr = {
  test: {
    test: 'hihi {{lala}}',
  },
  // iso
  dto: {
    ...frAuth.dto,
    ...frKlasses.dto,
    ...frProducts.dto,
    ...frProjects.dto,
    ...frSchools.dto,
    ...frSettings.dto,
    ...frStudents.dto,
  },
  form: {
    ...frAuth.form,
    ...frKlasses.form,
    ...frProducts.form,
    ...frProjects.form,
    ...frSchools.form,
    ...frSettings.form,
    ...frStudents.form,
  },
  action: {
    ...frAuth.action,
    ...frKlasses.action,
    ...frProducts.action,
    ...frProjects.action,
    ...frSchools.action,
    ...frSettings.action,
    ...frStudents.action,
  },
  getter: {
    ...frAuth.getter,
    ...frKlasses.getter,
    ...frProducts.getter,
    ...frProjects.getter,
    ...frSchools.getter,
    ...frSettings.getter,
    ...frStudents.getter,
  },
  // module iso
  auth: frAuth,
  klasses: frKlasses,
  products: frProducts,
  projects: frProjects,
  schools: frSchools,
  settings: frSettings,
  students: frStudents,
  // other
  navigation: {
    dashboard: 'Tableau de bord',
    schools: 'Écoles',
    projects: 'Projets',
    products: 'Produits',
    signIn: 'Se connecter',
    signUp: "S'inscrire",
    signOut: 'Se déconnecter',
    settings: 'Paramètres',
  },
  common: {
    actions: {
      add: 'Ajouter',
      cancel: 'Annuler',
      select: 'Sélectionner une option',
      back: 'Retour',
      edit: 'Modifier',
      save: 'Sauvegarder',
    },
    status: {
      active: 'Actif',
      inactive: 'Inactif',
      published: 'Publié',
      unpublished: 'Non publié',
    },
    error: {
      undefined: 'Une erreur inconnue.',
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

console.log('number of dtos', Object.keys(fr.dto).length);
console.log('number of forms', Object.keys(fr.form).length);
console.log('number of actions', Object.keys(fr.action).length);
