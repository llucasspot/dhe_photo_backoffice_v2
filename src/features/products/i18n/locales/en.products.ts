import { ProductsI18nTranslationsKeys } from '../products.i18n-translations-keys';

export const enProducts: ProductsI18nTranslationsKeys = {
  title: 'Products',
  addProduct: 'Add Product',
  list: {
    error: 'Error loading products.',
    pending: 'Loading products...',
    empty: 'No products found.',
  },
  detail: {
    title: 'Product Details',
    subtitle: 'View detailed information about this product.',
    fields: {
      name: 'Product Name',
      description: 'Description',
      longSize: 'Long Size (mm)',
      shortSize: 'Short Size (mm)',
    },
  },
  create: {
    title: 'Create New Product',
    pending: 'Creating product...',
    success: 'Product created successfully!',
    error: 'Failed to create product. Please try again.',
    form: {
      name: 'Product Name',
      description: 'Description',
      longSize: 'Long Size (mm)',
      shortSize: 'Short Size (mm)',
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
      longSize: {
        IsNumber: 'Long size must be a number',
        Min: 'Long size must be greater than 0',
      },
      shortSize: {
        IsNumber: 'Short size must be a number',
        Min: 'Short size must be greater than 0',
      },
    },
  },
};
