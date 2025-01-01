import { useParams } from '@tanstack/react-router';
import { match } from 'ts-pattern';

import { useGetter } from '#action/react';
import { ProductDto } from '#features/products/domain';
import { ProductGetter } from '#features/products/use-cases';
import { useI18n } from '#i18n/react';
import { Link } from '#routing/react';

const ProductDetailLoading = () => (
  <div className="p-8">
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 rounded w-1/4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  </div>
);

const ProductDetailError = ({ error }: { error: Error | null }) => {
  const { t } = useI18n();
  console.error('Project detail error:', error);
  return (
    <div className="p-8">
      <div className="text-red-500">{t('products.detail.error')}</div>
    </div>
  );
};

const ProductDetailContent = ({ product }: { product: ProductDto }) => {
  const { t } = useI18n();

  return (
    <div className="p-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          {product.name}
        </h2>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link to="/products">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              {t('common.actions.back')}
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {t('products.detail.title')}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {t('products.detail.subtitle')}
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                {t('products.detail.fields.name')}
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {product.name}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                {t('products.detail.fields.description')}
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {product.description}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                {t('products.detail.fields.longSize')}
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {product.getPictureFormat().cm}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export const ProductDetailPage = () => {
  const { productId } = useParams({ from: '/products/$productId' });
  const {
    data: product,
    isLoading,
    error,
  } = useGetter(ProductGetter, productId);

  return match({ product, isLoading, error })
    .with({ isLoading: true }, ProductDetailLoading)
    .when(({ error }) => !!error, ProductDetailError)
    .when(
      ({ product }) => !!product,
      ({ product }) => <ProductDetailContent product={product!} />,
    )
    .run();
};
