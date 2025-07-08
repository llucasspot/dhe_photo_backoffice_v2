import { match } from 'ts-pattern';

import { ProductRow } from './product-row';

import { useContextGetter } from '#action/react';
import { ProductDto } from '#features/products/domain';
import { ProductsGetter } from '#features/products/use-cases';
import { useI18n } from '#i18n/react';

const ProductListLoading = () => {
  const { t } = useI18n();
  const { getter } = useContextGetter(ProductsGetter);

  return (
    <div className="p-4 text-center text-gray-500">
      {t(getter.i18nKeys.pending)}
    </div>
  );
};

const ProductListError = ({ error }: { error: Error | null }) => {
  const { t } = useI18n();
  const { getter } = useContextGetter(ProductsGetter);

  console.error('Product list error:', error);

  return (
    <div className="p-4 text-center text-red-500">
      {t(getter.i18nKeys.error)}
    </div>
  );
};

const ProductListEmpty = () => {
  const { t } = useI18n();
  const { getter } = useContextGetter(ProductsGetter);

  return (
    <div className="p-4 text-center text-gray-500">
      {t(getter.i18nKeys.empty)}
    </div>
  );
};

const ProductListNonEmpty = ({ products }: { products: ProductDto[] }) => {
  return (
    <ul className="divide-y divide-gray-200">
      {products.map((product) => (
        <li key={product.id}>
          <ProductRow product={product} />
        </li>
      ))}
    </ul>
  );
};

export const ProductList = () => {
  const { queryResult } = useContextGetter(ProductsGetter);
  const { data: products = [], isLoading, error } = queryResult;

  return match({ isLoading, error, products })
    .with({ isLoading: true }, ProductListLoading)
    .when(({ error }) => !!error, ProductListError)
    .with({ products: [] }, ProductListEmpty)
    .when(({ products }) => products.length > 0, ProductListNonEmpty)
    .run();
};
