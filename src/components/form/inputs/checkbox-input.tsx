import { ComponentProps } from 'react';
import { useForm } from '@mygoodstack/form-react';

import { classNames } from '#core/react';
import { useI18n } from '#i18n/react';

type CheckboxInputProps = ComponentProps<'input'> & {
  label: string;
  formKey: string;
};

export function CheckboxInput({
  formKey,
  className = '',
  ...props
}: CheckboxInputProps) {
  const { t } = useI18n();
  const {
    dto,
    form: { register },
  } = useForm();

  const dtoName = dto.name;
  const i18nLabelKey = `dto.${dtoName}.${formKey}.label`;

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
      <label className="text-sm text-gray-700">{t(i18nLabelKey)}</label>
    </div>
  );
}
