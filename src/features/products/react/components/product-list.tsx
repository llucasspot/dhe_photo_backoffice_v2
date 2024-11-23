import { match } from 'ts-pattern';

import { ProductRow } from './product-row';

import { ProductDto } from '#features/products/domain';
import { useI18n } from '#i18n/react';

const ProductListLoading = () => {
  const { t } = useI18n();
  return (
    <div className="p-4 text-center text-gray-500">
      {t('products.list.pending')}
    </div>
  );
};

const ProductListError = ({ error }: { error: Error | null }) => {
  const { t } = useI18n();
  console.error('Product list error:', error);
  return (
    <div className="p-4 text-center text-red-500">
      {t('products.list.error')}
    </div>
  );
};

const ProductListEmpty = () => {
  const { t } = useI18n();
  return (
    <div className="p-4 text-center text-gray-500">
      {t('products.list.empty')}
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

export const ProductList = ({
  products,
  isLoading,
  error,
}: {
  products: ProductDto[];
  isLoading: boolean;
  error: Error | null;
}) => {
  return match({ isLoading, error, products })
    .with({ isLoading: true }, ProductListLoading)
    .when(({ error }) => !!error, ProductListError)
    .with({ products: [] }, ProductListEmpty)
    .when(({ products }) => products.length > 0, ProductListNonEmpty)
    .run();
};
