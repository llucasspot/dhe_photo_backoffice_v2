import { ProductsI18nTranslationsKeys } from '../products.i18n-translations-keys';

export const enProducts: ProductsI18nTranslationsKeys = {
  title: 'Products',
  addProduct: 'Add Product',
  list: {
    error: 'Error loading products',
    pending: 'Loading products..',
    empty: 'No products found',
  },
  detail: {
    title: 'Product Details',
    subtitle: 'View detailed information about this product',
    fields: {
      name: 'Product Name',
      description: 'Description',
      template: {
        canvas: {
          height: 'Long Size (mm)',
          width: 'Short Size (mm)',
        },
      },
    },
  },
  create: {
    title: 'Create New Product',
    pending: 'Creating product..',
    success: 'Product created successfully!',
    error: 'Failed to create product. Please try again',
    form: {
      name: 'Product Name',
      description: 'Description',
      template: {
        canvas: {
          height: 'Long Size (mm)',
          width: 'Short Size (mm)',
        },
      },
      submit: 'Create Product',
    },
    validation: {
      name: {
        IsString: 'Product name must be text',
        IsNotEmpty: 'Product name is required',
        MaxLength: 'Product name cannot exceed 100 characters',
      },
      description: {
        IsString: 'Description must be text',
        MaxLength: 'Description cannot exceed 200 characters',
      },
      template: {
        canvas: {
          ValidateNested: 'Template structure is invalid',
          IsNumber: 'Canvas dimension must be a number',
          Min: 'Canvas dimension must be greater than 0',
          Required: 'Canvas dimensions are required',
          height: {
            IsNumber: 'Long size must be a number',
            Min: 'Long size must be greater than 0',
          },
          width: {
            IsNumber: 'Short size must be a number',
            Min: 'Short size must be greater than 0',
          },
        },
        layers: {
          IsArray: 'Layers must be an array',
          ValidateNested: 'Layer structure is invalid',
          Required: 'Layers are required',
          item: {
            x: {
              IsNumber: 'Layer X position must be a number',
              Required: 'Layer X position is required',
            },
            y: {
              IsNumber: 'Layer Y position must be a number',
              Required: 'Layer Y position is required',
            },
            width: {
              IsNumber: 'Layer width must be a number',
              Min: 'Layer width must be greater than 0',
              Required: 'Layer width is required',
            },
            height: {
              IsNumber: 'Layer height must be a number',
              Min: 'Layer height must be greater than 0',
              Required: 'Layer height is required',
            },
          },
        },
      },
    },
  },
  template: {
    layers: {
      title: 'Layers',
      addLayer: 'Add Layer',
      layer: 'Layer',
      delete: 'Delete layer',
      dimensions: {
        x: 'X',
        y: 'Y',
        height: 'Height',
        width: 'Width',
      },
    },
  },
};
