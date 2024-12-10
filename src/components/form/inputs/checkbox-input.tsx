import { ComponentProps } from 'react';
import { useFormContext } from 'react-hook-form';

import { classNames } from '#core/react';
import { useI18n } from '#i18n/react';

type CheckboxInputProps = ComponentProps<'input'> & {
  label: string;
  formKey: string;
};

export function CheckboxInput({
  label,
  formKey,
  className = '',
  ...props
}: CheckboxInputProps) {
  const { t } = useI18n();
  const { register } = useFormContext();

  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        className={classNames(
          'rounded border-gray-300 text-blue-600 focus:ring-blue-500',
          className,
        )}
        {...register(formKey)}
        {...props}
      />
      <label className="text-sm text-gray-700">{t(label)}</label>
    </div>
  );
}
