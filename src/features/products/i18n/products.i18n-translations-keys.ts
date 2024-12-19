export type ProductsI18nTranslationsKeys = {
  title: string;
  addProduct: string;
  list: {
    error: string;
    pending: string;
    empty: string;
  };
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
    pending: string;
    success: string;
    error: string;
    form: {
      name: string;
      description: string;
      template: {
        canvas: {
          height: string;
          width: string;
        };
      };
      submit: string;
    };
    validation: {
      name: {
        IsString: string;
        IsNotEmpty: string;
        MaxLength: string;
      };
      description: {
        IsString: string;
        MaxLength: string;
      };
      template: {
        canvas: {
          ValidateNested: string;
          IsNumber: string;
          Min: string;
          Required: string;
          height: {
            IsNumber: string;
            Min: string;
          };
          width: {
            IsNumber: string;
            Min: string;
          };
        };
        layers: {
          IsArray: string;
          ValidateNested: string;
          Required: string;
          item: {
            x: {
              IsNumber: string;
              Required: string;
            };
            y: {
              IsNumber: string;
              Required: string;
            };
            width: {
              IsNumber: string;
              Min: string;
              Required: string;
            };
            height: {
              IsNumber: string;
              Min: string;
              Required: string;
            };
          };
        };
      };
    };
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
