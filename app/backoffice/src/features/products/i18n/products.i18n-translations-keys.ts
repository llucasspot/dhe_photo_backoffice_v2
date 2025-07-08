import { I18nAction, I18nDto, I18nForm, I18nGetter } from '../../../i18n.types';

import {
  CreateProductBody,
  ProductDto,
  TemplateBody,
} from '#features/products/domain';

export type ProductsI18nTranslationsKeys = {
  dto: {
    CreateProductBody: I18nDto<CreateProductBody>;
    TemplateBody: I18nDto<TemplateBody>;
    LayerBody: I18nDto<TemplateBody['layers'][0]>;
    CanvasBody: I18nDto<TemplateBody['canvas']>;
    ProductDto: Omit<I18nDto<ProductDto>, 'getPictureFormat' | 'getMediaType'>;
  };
  form: {
    CreateProductForm: I18nForm;
  };
  action: {
    CreateProductAction: I18nAction;
  };
  getter: {
    ProductsGetter: I18nGetter;
    ProductGetter: I18nGetter;
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
