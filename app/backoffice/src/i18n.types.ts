export type I18nAction = {
  success: { label: string };
  pending: { label: string };
  error: { label: string };
};

export type I18nGetter = {
  success: { label: string };
  pending: { label: string };
  error: { label: string };
  empty: { label: string };
};

export type I18nDto<TDto extends object> = Record<
  keyof TDto,
  {
    label: string;
    validation?: Partial<
      Record<
        | 'isArray'
        | 'isBoolean'
        | 'isDate'
        | 'isEmail'
        | 'isEnum'
        | 'isIBAN'
        | 'isNotEmpty'
        | 'isNumber'
        | 'isPhoneNumber'
        | 'isPostalCode'
        | 'isString'
        | 'length'
        | 'matches'
        | 'max'
        | 'maxLength'
        | 'min'
        | 'minLength'
        | 'validateNested',
        string
      >
    >;
  }
>;

export type I18nForm = {
  title: string;
  subtitle?: string;
  button: {
    submit: {
      label: string;
    };
    reset: {
      label: string;
    };
  };
};
