import { ComponentProps, PropsWithChildren } from 'react';
import { FieldValues, Path } from 'react-hook-form';
import {
  Form,
  useErrorProps,
  useForm,
  useInputProps,
  useLabelProps,
} from '@mygoodstack/form-react';

import { FormInput } from '../inputs/form-input';

import { FormButton } from '#components';
import { classNames } from '#core/react';
import { useI18n } from '#i18n/react';

const Header = () => {
  const { t } = useI18n();
  const { formName } = useForm();

  const title = t(`form.${formName}.title`);
  const subtitleI18nKey = `form.${formName}.subtitle`;
  const subtitle = t(subtitleI18nKey);
  const isSubtitlePresent = subtitle != subtitleI18nKey;

  return (
    <div className="mb-8">
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        {title}
      </h2>
      {isSubtitlePresent && (
        <p className="mt-1 text-sm leading-6 text-gray-600">{subtitle}</p>
      )}
    </div>
  );
};

const Footer = () => {
  const { t } = useI18n();
  const {
    formName,
    form: {
      formState: { isSubmitting },
    },
  } = useForm();
  return (
    <div className="mt-6 flex items-center justify-end gap-x-6">
      <button
        type="reset"
        className="text-sm font-semibold leading-6 text-gray-900"
      >
        {t(`form.${formName}.button.reset.label`)}
      </button>
      <button
        type="submit"
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        disabled={isSubmitting}
      >
        {t(`form.${formName}.button.submit.label`)}
      </button>
    </div>
  );
};

type WithFormKey<TFormBody> = {
  formKey: Path<TFormBody>;
};

const Label = <TFormBody extends FieldValues>({
  formKey,
  hidden = false,
}: WithFormKey<TFormBody> & {
  hidden?: boolean;
}) => {
  const { t } = useI18n();
  const { dto } = useForm();
  const { required } = useInputProps<TFormBody>(formKey);
  const { props: labelProps } = useLabelProps<TFormBody>(formKey);

  const dtoName = dto.name;
  const i18nLabelKey = `dto.${dtoName}.${formKey}.label`;

  return (
    <label
      {...labelProps}
      className={classNames(
        hidden ? 'sr-only' : '',
        'block text-sm font-medium leading-6 text-gray-900',
      )}
    >
      {t(i18nLabelKey)}
      {required && <span className="text-red-500">*</span>}
    </label>
  );
};

const ErrorLabel = <TFormBody extends FieldValues>({
  formKey,
}: WithFormKey<TFormBody>) => {
  const { t } = useI18n();
  const { dto } = useForm();
  const { error } = useErrorProps(formKey);

  if (!error) {
    return null;
  }
  const dtoName = dto.name;
  const errorType = error.type;
  const i18nErrorMessageKey = errorType
    ? `dto.${dtoName}.${formKey}.validation.${errorType}`
    : 'common.errors.undefined';

  return (
    <p id={`${formKey}-error`} className="mt-2 text-sm text-red-600">
      {t(i18nErrorMessageKey)}
    </p>
  );
};

type InputProps<TFormBody> = {
  formKey: Path<TFormBody>;
  options?: string[];
} & ComponentProps<'input'>;

const Input = <TFormBody extends FieldValues>({
  formKey,
  options,
  ...inputProps
}: InputProps<TFormBody>) => {
  return (
    <div className="mt-1 relative">
      {options && (
        <div className="absolute inset-y-0 left-0 flex items-center">
          <Label<TFormBody> formKey={formKey} hidden={true} />
          <select
            id={formKey}
            name={formKey}
            className="h-full rounded-md border-0 bg-transparent bg-none pl-3 pr-7 text-gray-500 focus:outline-none focus:ring-0 sm:text-sm"
          >
            {options.map((value) => {
              return <option>{value}</option>;
            })}
          </select>
        </div>
      )}
      <FormInput<TFormBody>
        formKey={formKey}
        {...inputProps}
        className={classNames(
          options ? 'pl-20 pr-3' : '',
          'block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm',
          inputProps.className,
        )}
        classNameOnError="border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500"
      />
    </div>
  );
};

const InputContainer = ({
  children,
  ...props
}: PropsWithChildren & ComponentProps<'div'>) => {
  return (
    <div {...props} className={classNames('space-y-1', props.className)}>
      {children}
    </div>
  );
};

const SubmitButton = ({ className }: { className?: string }) => {
  const { t } = useI18n();
  const { formName } = useForm();
  return (
    <FormButton className={className}>
      {t(`form.${formName}.button.submit.label`)}
    </FormButton>
  );
};

const Title = () => {
  const { t } = useI18n();
  const { formName } = useForm();

  return (
    <h2 className="text-base font-semibold leading-7 text-gray-900">
      {t(`form.${formName}.title`)}
    </h2>
  );
};

type SelectProps<TFormBody extends FieldValues> = {
  formKey: Path<TFormBody>;
  options: Array<{
    value: string;
    label: string;
  }>;
} & ComponentProps<'select'>;

const Select = <TFormBody extends FieldValues>({
  formKey,
  options,
  ...selectProps
}: SelectProps<TFormBody>) => {
  const { t } = useI18n();
  const {
    form: {
      register,
      formState: { errors },
    },
  } = useForm();

  const error = errors[formKey]?.message as string;
  return (
    <select
      {...selectProps}
      className={`
          w-full px-3 py-2 border rounded-lg shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${selectProps.className}
        `}
      {...register(formKey)}
    >
      <option value="">{t('common.actions.select')}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export const form = {
  Form,
  Title,
  Header,
  InputContainer,
  Label,
  Input,
  Select,
  ErrorLabel,
  Footer,
  SubmitButton,
};
