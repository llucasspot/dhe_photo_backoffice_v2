import { ComponentProps } from 'react';
import { useFormContext } from 'react-hook-form';

import { useI18n } from '#i18n/react';

type SelectProps = ComponentProps<'select'> & {
  label: string;
  formKey: string;
  options: Array<{
    value: string;
    label: string;
  }>;
};

export function Select({
  label,
  formKey,
  options,
  className = '',
  ...props
}: SelectProps) {
  const { t } = useI18n();
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[formKey]?.message as string;

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {t(label)}
      </label>
      <select
        className={`
          w-full px-3 py-2 border rounded-lg shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${className}
        `}
        {...register(formKey)}
        {...props}
      >
        <option value="">{t('common.actions.select')}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-600">{t(error)}</p>}
    </div>
  );
}
