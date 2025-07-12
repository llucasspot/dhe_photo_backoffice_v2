import { ProjectsI18nTranslationsKeys } from '../projects.i18n-translations-keys';

export const frProjects: ProjectsI18nTranslationsKeys = {
  // iso
  dto: {
    AddProductBody: {
      projectId: {
        label: 'Projet',
        validation: {},
      },
      productId: {
        label: 'Produit',
        validation: {},
      },
      price: {
        label: 'Prix',
        validation: {},
      },
    },
    CreateKlassesBody: {
      projectId: {
        label: 'Projet',
        validation: {},
      },
      klasses: {
        label: 'Classes',
        validation: {},
      },
    },
    CreateProjectBody: {
      name: {
        label: 'Nom du projet',
        validation: {
          isString: 'Le nom du projet doit être du texte',
          isNotEmpty: 'Le nom du projet est requis',
          maxLength: 'Le nom du projet ne peut pas dépasser 100 caractères',
        },
      },
      schoolId: {
        label: 'École',
        validation: {
          isString: "L'école doit être sélectionnée",
          isNotEmpty: "L'école est requise",
        },
      },
      shotDate: {
        label: 'Date de prise de vue',
        validation: {
          isDate: 'Format de date de prise de vue invalide',
          isNotEmpty: 'La date de prise de vue est requise',
        },
      },
      orderEndDate: {
        label: 'Date de fin des commandes',
        validation: {
          isDate: 'Format de date de fin des commandes invalide',
          isNotEmpty: 'La date de fin des commandes est requise',
        },
      },
      messageForClients: {
        label: 'Message pour les clients',
        validation: {
          isString: 'Le message doit être du texte',
          maxLength: 'Le message ne peut pas dépasser 500 caractères',
        },
      },
    },
    SchoolProjectDto: {
      name: {
        label: 'Nom du projet',
        validation: {},
      },
      schoolId: {
        label: 'École',
        validation: {},
      },
      shotDate: {
        label: 'Date de prise de vue',
        validation: {},
      },
      orderEndDate: {
        label: 'Date de fin des commandes',
        validation: {},
      },
      state: {
        label: 'Status',
        validation: {},
      },
      messageForClients: {
        label: 'Message pour les clients',
        validation: {},
      },
      klasses: {
        label: 'Classes',
        validation: {},
      },
      id: {
        label: 'Identifiant',
        validation: {},
      },
      school: {
        label: 'École',
        validation: {},
      },
      products: {
        label: 'Produits',
        validation: {},
      },
    },
  },
  form: {
    CreateProjectForm: {
      title: 'Créer un projet',
      subtitle: undefined,
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
    AddProductToProjectAction: {
      success: {
        label: 'Produit ajouté avec succès !',
      },
      pending: {
        label: 'Ajout du produit en cours...',
      },
      error: {
        label: "Erreur lors de l'ajout du produit.",
      },
    },
    CreateGroupPictureFromFilesAction: {
      success: {
        label: 'Groupes créés avec succès !',
      },
      pending: {
        label: 'Création des groupes en cours...',
      },
      error: {
        label: 'Erreur lors de la création des groupes.',
      },
    },
    CreateKlassesFromFilesAction: {
      success: {
        label: 'Classes créées avec succès !',
      },
      pending: {
        label: 'Création des classes en cours...',
      },
      error: {
        label: 'Erreur lors de la création des classes.',
      },
    },
    CreateProjectAction: {
      success: {
        label: 'Projet créé avec succès !',
      },
      pending: {
        label: 'Création du projet en cours...',
      },
      error: {
        label: 'Erreur lors de la création du projet.',
      },
    },
  },
  getter: {
    ProjectsGetter: {
      success: {
        label: 'Projets chargés avec succès !',
      },
      pending: {
        label: 'Chargement des projets en cours...',
      },
      error: {
        label: 'Erreur lors du chargement des projets.',
      },
      empty: {
        label: 'Aucun projet trouvé.',
      },
    },
    ProjectGetter: {
      success: {
        label: 'Projet chargé avec succès !',
      },
      pending: {
        label: 'Chargement du projet en cours...',
      },
      error: {
        label: 'Erreur lors du chargement du projet.',
      },
      empty: {
        label: 'Projet non trouvé.',
      },
    },
    KlassGetter: {
      success: {
        label: 'Classe chargée avec succès !',
      },
      pending: {
        label: 'Chargement de la classe en cours...',
      },
      error: {
        label: 'Erreur lors du chargement de la classe.',
      },
      empty: {
        label: 'Classe non trouvée.',
      },
    },
  },
  // other
  title: 'Projets',
  addProject: 'Ajouter un projet',
  detail: {
    title: 'Détails du projet',
    subtitle: 'Voir les informations détaillées de ce projet.',
    dropzone: {
      instructions: 'Déposez un dossier contenant les dossiers de classe ici',
      hint: 'Chaque sous-dossier créera une nouvelle classe',
      dragActive: 'Déposez le dossier ici',
    },
    klasses: {
      title: 'Classes',
    },
    products: {
      title: 'Produits',
      select: 'Sélectionner un produit',
      price: 'Prix',
      add: 'Ajouter le produit',
      empty: 'Aucun produit ajouté',
      table: {
        product: 'Produit',
        price: 'Prix',
      },
    },
  },
  create: {
    title: 'Créer un nouveau projet',
  },
};
