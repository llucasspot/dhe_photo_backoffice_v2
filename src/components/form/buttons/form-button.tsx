import { useFormContext } from 'react-hook-form';

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
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <Button type={type} disabled={isSubmitting} {...props}>
      {children}
    </Button>
  );
};
