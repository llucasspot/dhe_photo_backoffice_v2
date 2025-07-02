import { I18nDto, I18nForm } from '../../../i18n.types';

import { CreateProductBody, TemplateBody } from '#features/products/domain';

export type ProductsI18nTranslationsKeys = {
  dto: {
    CreateProductBody: I18nDto<CreateProductBody>;
    TemplateBody: I18nDto<TemplateBody>;
    LayerBody: I18nDto<TemplateBody['layers'][0]>;
    CanvasBody: I18nDto<TemplateBody['canvas']>;
  };
  form: {
    CreateProductForm: I18nForm;
  };
  title: string;
  addProduct: string;
  detail: {
    title: string;
    subtitle: string;
    fields: {
      name: string;
      description: string;
      template: {
        canvas: {
          height: string;
          width: string;
        };
      };
    };
  };
  create: {
    title: string;
  };
  template: {
    layers: {
      title: string;
      addLayer: string;
      layer: string;
      delete: string;
      dimensions: {
        x: string;
        y: string;
        height: string;
        width: string;
      };
    };
  };
};
