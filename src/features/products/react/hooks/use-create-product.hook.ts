import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useService } from '#di/react';
import {
  CreateProductBody,
  ProductsControllerServicePort,
} from '#features/products/domain';
import { productsKeys } from '#features/products/use-cases';
import { ToastService } from '#toast/domain';

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const productsService = useService(ProductsControllerServicePort);
  const toastService = useService(ToastService);

  return useMutation({
    mutationFn: async (data: CreateProductBody) => {
      return toastService.promise(() => productsService.createProduct(data), {
        pending: 'products.create.pending',
        success: 'products.create.success',
        error: 'products.create.error',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productsKeys.lists() });
    },
    onError: (error) => {
      console.error('Failed to create product:', error);
    },
  });
};
