import { ProductsI18nTranslationsKeys } from '../products.i18n-translations-keys';

export const frProducts: ProductsI18nTranslationsKeys = {
  // iso
  dto: {
    CreateProductBody: {
      name: {
        label: 'Nom du produit',
        validation: {
          isString: 'Le nom du produit doit être du texte',
          isNotEmpty: 'Le nom du produit est requis',
          maxLength: 'Le nom du produit ne peut pas dépasser 100 caractères',
        },
      },
      description: {
        label: 'Description du produit',
        validation: {
          isNumber: 'La position X du calque doit être un nombre',
          isNotEmpty: 'La position X du calque est requise',
        },
      },
      template: {
        label: 'Template du produit',
        validation: {
          validateNested: 'La structure du template est invalide',
        },
      },
    },
    TemplateBody: {
      layers: {
        label: 'Calques',
        validation: {
          isArray: 'Les calques doivent être un tableau',
          validateNested: 'La structure du layers est invalide',
        },
      },
      canvas: {
        label: 'Canvas',
        validation: {
          validateNested: 'La structure du canvas est invalide',
        },
      },
    },
    LayerBody: {
      x: {
        label: 'Position X du calque',
        validation: {
          isNumber: 'La position X du calque doit être un nombre',
          isNotEmpty: 'La position X du calque est requise',
        },
      },
      y: {
        label: 'Position Y du calque',
        validation: {
          isNumber: 'La position Y du calque doit être un nombre',
          isNotEmpty: 'La position Y du calque est requise',
        },
      },
      width: {
        label: 'Largeur du calque',
        validation: {
          isNumber: 'La largeur du calque doit être un nombre',
          min: 'La largeur du calque doit être supérieure à 0',
          isNotEmpty: 'La largeur du calque est requise',
        },
      },
      height: {
        label: 'Hauteur du calque',
        validation: {
          isNumber: 'La hauteur du calque doit être un nombre',
          min: 'La hauteur du calque doit être supérieure à 0',
          isNotEmpty: 'La hauteur du calque est requise',
        },
      },
    },
    CanvasBody: {
      height: {
        label: 'Longueur (mm)',
        validation: {
          isNumber: 'La longueur doit être un nombre',
          min: 'La longueur doit être supérieure à 0',
        },
      },
      width: {
        label: 'Largeur (mm)',
        validation: {
          isNumber: 'La largeur doit être un nombre',
          min: 'La largeur doit être supérieure à 0',
        },
      },
    },
    ProductDto: {
      name: {
        label: 'Nom du produit',
        validation: undefined,
      },
      description: {
        label: 'Description',
        validation: undefined,
      },
      id: {
        label: 'Identifiant',
        validation: undefined,
      },
      mediaTypeName: {
        label: 'Nom du type de media',
        validation: undefined,
      },
      pictureFormatName: {
        label: "Format de l'image",
        validation: undefined,
      },
    },
  },
  form: {
    CreateProductForm: {
      title: 'Créer un nouveau produit',
      button: {
        submit: {
          label: 'Enregistrer',
        },
        reset: {
          label: 'Annuler',
        },
      },
    },
  },
  action: {
    CreateProductAction: {
      success: {
        label: 'Produit créé avec success !',
      },
      pending: {
        label: 'Création du produit en cours...',
      },
      error: {
        label: 'Erreur lors de la création du produit.',
      },
    },
  },
  getter: {
    ProductsGetter: {
      success: {
        label: 'Produits chargés avec success !',
      },
      pending: {
        label: 'Chargement des produits en cours...',
      },
      error: {
        label: 'Erreur lors du chargement des produits.',
      },
      empty: {
        label: 'Aucun produit trouvé.',
      },
    },
    ProductGetter: {
      success: {
        label: 'Produit chargé avec success !',
      },
      pending: {
        label: 'Chargement du produit en cours...',
      },
      error: {
        label: 'Erreur lors du chargement du produit.',
      },
      empty: {
        label: 'Produit non trouvé.',
      },
    },
  },
  // other
  title: 'Produits',
  addProduct: 'Ajouter un produit',
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
