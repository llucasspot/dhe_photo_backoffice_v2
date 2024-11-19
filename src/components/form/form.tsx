import { PropsWithChildren } from 'react';
import {
  FormProvider as RHFFormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

import { Dto } from '#core/domain';
import { Type } from '#di/domain';

export type FormProps<TDto extends Dto<TDto>> = PropsWithChildren<{
  dto: Type<TDto>;
  onSubmit: SubmitHandler<TDto>;
  className?: string;
}>;

export function Form<TDto extends Dto<TDto>>({
  dto,
  onSubmit,
  children,
  className = '',
}: FormProps<TDto>) {
  const methods = useForm<TDto>({
    resolver: classValidatorResolver(dto),
  });
  return (
    <RHFFormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </RHFFormProvider>
  );
}
