import { useQuery } from '@tanstack/react-query';

import { productsKeys } from './use-products.hook';

import { useService } from '#di/react';
import { ProductsControllerServicePort } from '#features/products/domain';

export const useProduct = (id: string) => {
  const productsService = useService(ProductsControllerServicePort);

  return useQuery({
    queryKey: productsKeys.detail(id),
    queryFn: () => productsService.getProduct(id),
  });
};
