import { ComponentProps } from 'react';
import { FieldValues, Path, useFormContext } from 'react-hook-form';

import { classNames } from '#core/react';

type FormInputProps<TFormBody extends FieldValues> = ComponentProps<'input'> & {
  formKey: Path<TFormBody>;
  classNameOnError?: string;
};

export function FormInput<TFormBody extends FieldValues>({
  formKey,
  className,
  classNameOnError,
  ...props
}: FormInputProps<TFormBody>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<TFormBody>();

  const error = errors[formKey]?.message as string;

  return (
    <input
      {...register(formKey)}
      {...props}
      id={formKey}
      name={formKey}
      className={classNames(className, error ? classNameOnError : '')}
      aria-invalid={error ? 'true' : 'false'}
      aria-describedby={`${formKey}-error`}
    />
  );
}
