import { ProductDto } from '#features/products/domain';
import { Link } from '#routing/react';

interface ProductRowProps {
  product: ProductDto;
}

export const ProductRow = ({ product }: ProductRowProps) => {
  const productId = product.id;
  return (
    <Link
      to="/products/$productId"
      params={{ productId }}
      className="block px-6 py-4 hover:bg-gray-50"
    >
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center space-x-3">
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500">
                {product.description} • {product.longSize}x{product.shortSize}mm
              </p>
            </div>
          </div>
        </div>
        <div>
          <svg
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};
