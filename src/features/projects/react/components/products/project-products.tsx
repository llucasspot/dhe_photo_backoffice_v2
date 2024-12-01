import { useState } from 'react';

import { useAddProductToProject } from '../../hooks/use-add-product-to-project.hook';

import { ProductSelector } from './product-selector';

import { Button } from '#components';
import { ProductDto } from '#features/products/domain';
import { ProjectDto } from '#features/projects/domain';
import { useI18n } from '#i18n/react';

interface ProjectProductsProps {
  project: ProjectDto;
}

export const ProjectProducts = ({ project }: ProjectProductsProps) => {
  const { t } = useI18n();
  const [selectedProduct, setSelectedProduct] = useState<ProductDto | null>(
    null,
  );
  const [price, setPrice] = useState<string>('');
  const addProduct = useAddProductToProject();

  const handleAddProduct = async () => {
    if (!selectedProduct || !price) return;

    await addProduct.mutateAsync({
      projectId: project.id,
      productId: selectedProduct.id,
      price: parseFloat(price),
    });

    setSelectedProduct(null);
    setPrice('');
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        {t('projects.detail.products.title')}
      </h3>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="space-y-4">
          <ProductSelector
            selectedProduct={selectedProduct}
            onSelectProduct={setSelectedProduct}
          />

          {selectedProduct && (
            <div className="flex items-end space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  {t('projects.detail.products.price')}
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">€</span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <Button
                onClick={handleAddProduct}
                disabled={!selectedProduct || !price || addProduct.isPending}
              >
                {t('projects.detail.products.add')}
              </Button>
            </div>
          )}
        </div>

        {project.products?.length > 0 ? (
          <div className="mt-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('projects.detail.products.table.product')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('projects.detail.products.table.price')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {project.products.map((projectProduct) => (
                  <tr key={projectProduct.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {projectProduct.product?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      €{projectProduct.price.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-4 text-sm text-gray-500">
            {t('projects.detail.products.empty')}
          </p>
        )}
      </div>
    </div>
  );
};
