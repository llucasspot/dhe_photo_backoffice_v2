import { StudentsI18nTranslationsKeys } from '../students.i18n-translations-keys';

export const frStudents: StudentsI18nTranslationsKeys = {
  // iso
  dto: {
    CreateStudentBody: {
      klassId: {
        label: 'Classe',
        validation: {},
      },
      photos: {
        label: "Photos de l'élève",
        validation: {},
      },
    },
  },
  form: {},
  action: {},
  getter: {
    StudentsGetter: {
      success: {
        label: 'Elèves chargés avec succès !',
      },
      pending: {
        label: 'Chargement des élèves en cours...',
      },
      error: {
        label: 'Erreur lors du chargement des élèves.',
      },
      empty: {
        label: 'Aucun élève trouvé.',
      },
    },
  },
  // other
  title: 'Élèves',
  addStudent: 'Ajouter un élève',
  detail: {
    title: "Détails de l'élève",
    subtitle: 'Voir les informations détaillées de cet élève.',
    fields: {
      name: "Nom de l'élève",
    },
  },
  create: {
    title: 'Créer un nouvel élève',
  },
} as const;
