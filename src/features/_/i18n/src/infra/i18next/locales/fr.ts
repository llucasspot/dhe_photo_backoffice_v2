import { frAuth } from '#features/auth/i18n';
import { frKlasses } from '#features/klasses/i18n';
import { frProducts } from '#features/products/i18n';
import { frProjects } from '#features/projects/i18n';
import { frSchools } from '#features/schools/i18n';
import { frSettings } from '#features/settings/i18n';
import { frStudents } from '#features/students/i18n';
import { Translations } from '#i18n/domain';

export const fr: Translations = {
  dto: {
    ...frAuth.dto,
    ...frSettings.dto,
    ...frProjects.dto,
    ...frProducts.dto,
    ...frSchools.dto,
    ...frStudents.dto,
    ...frKlasses.dto,
  },
  form: {
    ...frAuth.form,
    ...frSettings.form,
    ...frProjects.form,
    ...frProducts.form,
    // ...frSchools.form,
    // ...frStudents.form,
    // ...frKlasses.form,
  },
  action: {
    ...frAuth.action,
    // ...frSettings.action,
    ...frProjects.action,
    // ...frProducts.action,
    ...frSchools.action,
    // ...frStudents.action,
    // ...frKlasses.action,
  },
  getter: {
    ...frAuth.getter,
    // ...frSettings.getter,
    // ...frProjects.getter,
    // ...frProducts.getter,
    ...frSchools.getter,
    ...frStudents.getter,
    // ...frKlasses.getter,
  },
  auth: frAuth,
  settings: frSettings,
  projects: frProjects,
  products: frProducts,
  schools: frSchools,
  students: frStudents,
  klasses: frKlasses,
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
