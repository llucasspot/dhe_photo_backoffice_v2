import { ComponentProps } from 'react';
import { useFormContext } from 'react-hook-form';

type InputProps = Omit<
  ComponentProps<'input'>,
  'hidden' | 'readOnly' | 'className'
> & {
  formKey: string;
};

export function HiddenInput({ formKey, ...props }: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[formKey]?.message as string;
  if (error) {
    console.log('HiddenInput error : ', error);
  }

  return <input hidden readOnly {...register(formKey)} {...props} />;
}
