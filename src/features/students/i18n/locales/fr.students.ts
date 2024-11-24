import { StudentsI18nTranslationsKeys } from '../students.i18n-translations-keys';

export const frStudents: StudentsI18nTranslationsKeys = {
  title: 'Élèves',
  addStudent: 'Ajouter un élève',
  list: {
    error: 'Erreur lors du chargement des élève.',
    pending: 'Chargement des élèves....',
    empty: 'Aucune élève trouvé.',
  },
  detail: {
    title: "Détails de l'élève",
    subtitle: 'Voir les informations détaillées de cet élève.',
    error: "Erreur lors du chargement des détails de l'élève.",
    fields: {
      name: "Nom de l'élève",
    },
  },
  create: {
    title: 'Créer un nouvel élève',
    pending: "Création de l'élève en cours...",
    success: 'Élève créée avec succès !',
    error: "Échec de la création de l'élève. Veuillez réessayer.",
    form: {
      name: "Nom de l'élève",
      submit: "Créer l'élève",
    },
    validation: {
      name: {
        IsString: "Le nom de l'élève doit être du texte",
        IsNotEmpty: "Le nom de l'élève est requis",
        MaxLength: "Le nom de l'élève ne peut pas dépasser 100 caractères",
      },
    },
  },
} as const;
