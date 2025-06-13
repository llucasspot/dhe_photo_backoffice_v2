import { FieldValues, Path, useFormContext } from 'react-hook-form';

import { FormInput } from '../inputs/form-input';
import { FormInputErrorMessage } from '../inputs/form-input-error-message';

import { Form, useFormOtherContext } from '#components';
import { classNames } from '#core/react';
import { useI18n } from '#i18n/react';

const Header = () => {
  const { t } = useI18n();
  const { i18nPrefix } = useFormOtherContext();

  const title = t(`${i18nPrefix}.form.title`);
  const subtitleI18nKey = `${i18nPrefix}.form.subtitle`;
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
    formState: { isSubmitting },
  } = useFormContext();
  return (
    <div className="mt-6 flex items-center justify-end gap-x-6">
      <button
        type="reset"
        className="text-sm font-semibold leading-6 text-gray-900"
      >
        {t('settings.common.cancel')}
      </button>
      <button
        type="submit"
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        disabled={isSubmitting}
      >
        {t('settings.common.save')}
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
  const { i18nPrefix } = useFormOtherContext();
  return (
    <label
      htmlFor={formKey}
      className={classNames(
        hidden ? 'sr-only' : '',
        'block text-sm font-medium leading-6 text-gray-900',
      )}
    >
      {t(`${i18nPrefix}.form.input.${formKey}.label`)}
    </label>
  );
};

const ErrorLabel = <TFormBody extends FieldValues>({
  formKey,
}: WithFormKey<TFormBody>) => {
  const { t } = useI18n();
  return (
    <FormInputErrorMessage<TFormBody>
      formKey={formKey}
      className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
      render={(error) => {
        return (
          <p id={`${formKey}-error`} className="mt-2 text-sm text-red-600">
            {t(error)}
          </p>
        );
      }}
    />
  );
};

type InputProps<TFormBody> = {
  formKey: Path<TFormBody>;
  type: string;
  options?: string[];
  placeholder?: string;
};

const Input = <TFormBody extends FieldValues>({
  formKey,
  type,
  options,
  placeholder,
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
        type={type}
        placeholder={placeholder}
        className={classNames(
          options ? 'pl-20 pr-3' : '',
          'block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm',
        )}
        classNameOnError="border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500"
      />
    </div>
  );
};

export const form = {
  Form,
  Header,
  Label,
  Input,
  ErrorLabel,
  Footer,
};
