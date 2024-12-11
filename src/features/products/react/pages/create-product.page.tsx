import { AvailablePictureFormatName } from '../../domain/picture-formats';
import { TemplateInput } from '../components/template.input';
import { useCreateProduct } from '../hooks';

import { Button, Form, FormButton, Input } from '#components';
import { useService } from '#di/react';
import { CreateProductBody } from '#features/products/domain';
import { useI18n } from '#i18n/react';
import { RoutingServicePort } from '#routing/domain';

class Dim {
  height: number;
  width: number;

  constructor(availablePictureFormatName: AvailablePictureFormatName) {
    const [width, height] = availablePictureFormatName.split('x');
    this.height = parseInt(height) * 10; // cm to mm
    this.width = parseInt(width) * 10;
  }
}

const defaultDim = new Dim('18x24');

export const CreateProductPage = () => {
  const routingService = useService(RoutingServicePort);
  const { t } = useI18n();
  const createProduct = useCreateProduct();

  const onSubmit = async (data: CreateProductBody) => {
    try {
      await createProduct.mutateAsync(data);
      await routingService.redirect('/products');
    } catch (error) {
      console.log('CreateProductPage form error : ', error);
    }
  };

  return (
    <div className="p-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          {t('products.create.title')}
        </h2>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <Form
          dto={CreateProductBody}
          onSubmit={onSubmit}
          className="space-y-6"
          defaultValues={{
            longSize: defaultDim.height,
            shortSize: defaultDim.width,
          }}
        >
          <Input formKey="name" label="products.create.form.name" />
          <Input
            formKey="description"
            label="products.create.form.description"
          />
          <Input
            formKey="longSize"
            label="products.create.form.longSize"
            type="number"
          />
          <Input
            formKey="shortSize"
            label="products.create.form.shortSize"
            type="number"
          />

          <TemplateInput />

          <div className="flex justify-end space-x-4">
            <Button variant="secondary" link={{ to: '/products' }}>
              {t('common.actions.cancel')}
            </Button>
            <FormButton>{t('products.create.form.submit')}</FormButton>
          </div>
        </Form>
      </div>
    </div>
  );
};
