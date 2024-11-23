import { ProductList } from '../components';
import { useProducts } from '../hooks';

import { useI18n } from '#i18n/react';
import { Link } from '#routing/react';

export const ProductsPage = () => {
  const { t } = useI18n();
  const { data: products = [], isLoading, error } = useProducts();

  return (
    <div className="p-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {t('products.title')}
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link to="/products/create">
            <button
              type="button"
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {t('products.addProduct')}
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-md">
        <ProductList products={products} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
};