import { useQuery } from '@tanstack/react-query';

import { productsKeys } from './use-products.hook';

import { useService } from '#di/react';
import { ProductsServicePort } from '#features/products/domain';

export const useProduct = (id: string) => {
  const productsService = useService(ProductsServicePort);

  return useQuery({
    queryKey: productsKeys.detail(id),
    queryFn: () => productsService.getProduct(id),
  });
};
