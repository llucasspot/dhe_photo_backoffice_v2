import { useFormContext } from 'react-hook-form';

import { useI18n } from '#i18n/react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  formKey: string;
};

export function Input({
  label,
  formKey,
  className = '',
  ...props
}: InputProps) {
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
      <input
        className={`
          w-full px-3 py-2 border rounded-lg shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${className}
        `}
        {...register(formKey)}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{t(error)}</p>}
    </div>
  );
}
