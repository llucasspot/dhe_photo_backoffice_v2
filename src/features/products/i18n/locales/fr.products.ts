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
      template: {
        canvas: {
          height: 'Longueur (mm)',
          width: 'Largeur (mm)',
        },
      },
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
      template: {
        canvas: {
          height: 'Longueur (mm)',
          width: 'Largeur (mm)',
        },
      },
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
      template: {
        canvas: {
          ValidateNested: 'La structure du template est invalide',
          IsNumber: 'La dimension du canvas doit être un nombre',
          Min: 'La dimension du canvas doit être supérieure à 0',
          Required: 'Les dimensions du canvas sont requises',
          height: {
            IsNumber: 'La longueur doit être un nombre',
            Min: 'La longueur doit être supérieure à 0',
          },
          width: {
            IsNumber: 'La largeur doit être un nombre',
            Min: 'La largeur doit être supérieure à 0',
          },
        },
        layers: {
          IsArray: 'Les calques doivent être un tableau',
          ValidateNested: 'La structure du calque est invalide',
          Required: 'Les calques sont requis',
          item: {
            x: {
              IsNumber: 'La position X du calque doit être un nombre',
              Required: 'La position X du calque est requise',
            },
            y: {
              IsNumber: 'La position Y du calque doit être un nombre',
              Required: 'La position Y du calque est requise',
            },
            width: {
              IsNumber: 'La largeur du calque doit être un nombre',
              Min: 'La largeur du calque doit être supérieure à 0',
              Required: 'La largeur du calque est requise',
            },
            height: {
              IsNumber: 'La hauteur du calque doit être un nombre',
              Min: 'La hauteur du calque doit être supérieure à 0',
              Required: 'La hauteur du calque est requise',
            },
          },
        },
      },
    },
  },
  template: {
    layers: {
      title: 'Calques',
      addLayer: 'Ajouter un calque',
      layer: 'Calque',
      delete: 'Supprimer le calque',
      dimensions: {
        x: 'X',
        y: 'Y',
        height: 'Hauteur',
        width: 'Largeur',
      },
    },
  },
};
