import { useParams } from '@tanstack/react-router';

import { GetterProvider } from '#action/react';
import { ProductDetail } from '#features/products/react';
import { ProductGetter } from '#features/products/use-cases';

export const ProductDetailPage = () => {
  const { productId } = useParams({ from: '/products/$productId' });

  return (
    <GetterProvider Getter={ProductGetter} args={[productId]}>
      <ProductDetail />
    </GetterProvider>
  );
};
