import { KlassesI18nTranslationsKeys } from '../klasses.i18n-translations-keys';

export const frKlasses: KlassesI18nTranslationsKeys = {
  title: 'CLasses',
  addClass: 'Ajouter une classe',
  list: {
    error: 'Erreur lors du chargement des classes.',
    pending: 'Chargement des classes....',
    empty: 'Aucune classe trouvée.',
  },
  detail: {
    title: 'Détails de la classe',
    subtitle: 'Voir les informations détaillées de cette classe.',
    error: 'Erreur lors du chargement des détails de la classe.',
    fields: {
      name: 'Nom de la classe',
    },
  },
  create: {
    title: 'Créer une nouvelle classe',
    pending: 'Création de la classe en cours...',
    success: 'Classe créée avec succès !',
    error: 'Échec de la création de la classe. Veuillez réessayer.',
  },
} as const;
