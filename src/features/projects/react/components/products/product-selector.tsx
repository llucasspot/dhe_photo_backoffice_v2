import { useGetter } from '#action/react';
import { ProductDto } from '#features/products/domain';
import { ProductsGetter } from '#features/products/use-cases';
import { useI18n } from '#i18n/react';

interface ProductSelectorProps {
  selectedProduct: ProductDto | null;
  onSelectProduct: (product: ProductDto | null) => void;
}

export const ProductSelector = ({
  selectedProduct,
  onSelectProduct,
}: ProductSelectorProps) => {
  const { t } = useI18n();
  const { data: products = [], isLoading } = useGetter(ProductsGetter);

  if (isLoading) {
    return <div className="animate-pulse h-10 bg-gray-200 rounded"></div>;
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {t('projects.detail.products.select')}
      </label>
      <select
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        value={selectedProduct?.id || ''}
        onChange={(e) => {
          const product = products.find((p) => p.id === e.target.value);
          onSelectProduct(product || null);
        }}
      >
        <option value="">{t('common.actions.select')}</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name} ({product.getPictureFormat().cm}{' '}
            {product.getPictureFormat().ratio})
          </option>
        ))}
      </select>
    </div>
  );
};
