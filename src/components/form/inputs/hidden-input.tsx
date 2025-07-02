import { ComponentProps } from 'react';
import { useForm } from '@mygoodstack/form-react';

type InputProps = Omit<
  ComponentProps<'input'>,
  'hidden' | 'readOnly' | 'className'
> & {
  formKey: string;
};

export function HiddenInput({ formKey, ...props }: InputProps) {
  const {
    form: {
      register,
      formState: { errors },
    },
  } = useForm();

  const error = errors[formKey]?.message as string;
  if (error) {
    console.log('HiddenInput error : ', error);
  }

  return <input hidden readOnly {...register(formKey)} {...props} />;
}
