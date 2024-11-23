import { ProductsI18nTranslationsKeys } from '../products.i18n-translations-keys';

export const frProducts: ProductsI18nTranslationsKeys = {
  title: 'Produits',
  addProduct: 'Ajouter un produit',
  list: {
    error: 'Erreur lors du chargement des produits.',
    pending: 'Chargement des produits....',
    empty: 'Aucune produit trouvé.',
  },
  detail: {
    title: 'Détails du produit',
    subtitle: 'Voir les informations détaillées de ce produit.',
    fields: {
      name: 'Nom du produit',
      description: 'Description',
      longSize: 'Longueur (mm)',
      shortSize: 'Largeur (mm)',
    },
  },
  create: {
    title: 'Créer un nouveau produit',
    pending: 'Création du produit en cours...',
    success: 'Produit créé avec succès !',
    error: 'Échec de la création du produit. Veuillez réessayer.',
    form: {
      name: 'Nom du produit',
      description: 'Description',
      longSize: 'Longueur (mm)',
      shortSize: 'Largeur (mm)',
      submit: 'Créer le produit',
    },
    validation: {
      name: {
        IsString: 'Le nom du produit doit être du texte',
        IsNotEmpty: 'Le nom du produit est requis',
        MaxLength: 'Le nom du produit ne peut pas dépasser 100 caractères',
      },
      description: {
        IsString: 'La description doit être du texte',
        MaxLength: 'La description ne peut pas dépasser 200 caractères',
      },
      longSize: {
        IsNumber: 'La longueur doit être un nombre',
        Min: 'La longueur doit être supérieure à 0',
      },
      shortSize: {
        IsNumber: 'La largeur doit être un nombre',
        Min: 'La largeur doit être supérieure à 0',
      },
    },
  },
};
