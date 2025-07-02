import { useInstance } from '@mygoodstack/di-react';

import { AvailablePictureFormatName } from '../../../domain/dtos/picture-formats';
import { TemplateInput } from '../template.input';

import { useAction } from '#action/react';
import { form } from '#components';
import { CreateProductBody } from '#features/products/domain';
import { CreateProductAction } from '#features/products/use-cases';
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

export const CreateProductForm = () => {
  const routingService = useInstance(RoutingServicePort);
  const createProduct = useAction(CreateProductAction);
  const onSubmit = async (data: CreateProductBody) => {
    try {
      await createProduct.mutateAsync(data);
      await routingService.redirect('/products');
    } catch (error) {
      console.log('CreateProductPage form error : ', error);
    }
  };

  return (
    <form.Form
      formName="CreateProductForm"
      dto={CreateProductBody}
      onSubmit={onSubmit}
      className="space-y-6"
      defaultValues={{
        template: {
          canvas: {
            height: defaultDim.height,
            width: defaultDim.width,
          },
        },
      }}
    >
      <form.Header />

      <form.InputContainer>
        <form.Label formKey="name" />
        <form.Input formKey="name" />
        <form.ErrorLabel formKey="name" />
      </form.InputContainer>

      <form.InputContainer>
        <form.Label formKey="description" />
        <form.Input formKey="description" />
        <form.ErrorLabel formKey="description" />
      </form.InputContainer>

      <form.InputContainer>
        <form.Label formKey="template.canvas.height" />
        <form.Input formKey="template.canvas.height" type="number" />
        <form.ErrorLabel formKey="template.canvas.height" />
      </form.InputContainer>

      <form.InputContainer>
        <form.Label formKey="template.canvas.width" />
        <form.Input formKey="template.canvas.width" type="number" />
        <form.ErrorLabel formKey="template.canvas.width" />
      </form.InputContainer>

      <TemplateInput />

      <form.Footer />
    </form.Form>
  );
};
