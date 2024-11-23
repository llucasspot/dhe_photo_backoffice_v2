import { useQuery } from '@tanstack/react-query';

import { useService } from '#di/react';
import { ProductsServicePort } from '#features/products/domain';

export const productsKeys = {
  all: ['products'] as const,
  lists: () => [...productsKeys.all, 'list'] as const,
  list: (filters: string) => [...productsKeys.lists(), { filters }] as const,
  details: () => [...productsKeys.all, 'detail'] as const,
  detail: (id: string) => [...productsKeys.details(), id] as const,
};

export const useProducts = () => {
  const productsService = useService(ProductsServicePort);

  return useQuery({
    queryKey: productsKeys.lists(),
    queryFn: () => productsService.getProducts(),
  });
};
