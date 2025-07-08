import { CreateProductForm } from '../components/forms/create-product-form';

export const CreateProductPage = () => {
  return (
    <div className="p-8">
      <div className="bg-white shadow rounded-lg p-6">
        <CreateProductForm />
      </div>
    </div>
  );
};
