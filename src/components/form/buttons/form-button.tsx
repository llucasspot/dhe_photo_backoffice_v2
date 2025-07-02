import { useForm } from '@mygoodstack/form-react';

import { Button, ButtonProps } from '#components';

type FormButton = Omit<ButtonProps, 'disabled' | 'type'> & {
  type?: Extract<ButtonProps['type'], 'submit' | 'reset'>;
};

export const FormButton = ({
  children,
  type = 'submit',
  ...props
}: FormButton) => {
  const {
    form: {
      formState: { isSubmitting },
    },
  } = useForm();

  return (
    <Button type={type} disabled={isSubmitting} {...props}>
      {children}
    </Button>
  );
};
