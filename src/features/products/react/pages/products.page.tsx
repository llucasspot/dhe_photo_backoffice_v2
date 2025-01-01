import { ProductList } from '../components';

import { useGetter } from '#action/react';
import { Button } from '#components';
import { ProductsGetter } from '#features/products/use-cases';
import { useI18n } from '#i18n/react';

export const ProductsPage = () => {
  const { t } = useI18n();
  const { data: products = [], isLoading, error } = useGetter(ProductsGetter);

  return (
    <div className="p-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {t('products.title')}
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Button link={{ to: '/products/create' }}>
            {t('products.addProduct')}
          </Button>
        </div>
      </div>

      <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-md">
        <ProductList products={products} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
};
