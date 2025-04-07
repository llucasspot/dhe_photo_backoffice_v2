import { createContext, PropsWithChildren, useContext } from 'react';
import {
  DefaultValues,
  FormProvider as RHFFormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

import { classValidatorResolver } from './class-validator';

import { Dto } from '#core/domain';
import { Type } from '#di/domain';

const FormContext = createContext<{
  i18nPrefix: string;
  dto: Type<Dto<object>>;
} | null>(null);

export const useFormOtherContext = <TDto extends Dto<TDto>>() => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormOtherContext must be used within a Form');
  }
  return context as {
    i18nPrefix: string;
    dto: Type<Dto<TDto>>;
  };
};

export type FormProps<TDto extends Dto<TDto>> = PropsWithChildren<{
  i18nPrefix: string;
  dto: Type<TDto>;
  onSubmit: SubmitHandler<TDto>;
  className?: string;
  defaultValues?: DefaultValues<TDto>;
}>;

export function Form<TDto extends Dto<TDto>>({
  i18nPrefix,
  dto,
  onSubmit,
  children,
  className = '',
  defaultValues,
}: FormProps<TDto>) {
  const methods = useForm<TDto, unknown, TDto>({
    // @ts-expect-error resolver: classValidatorResolver(dto),
    resolver: classValidatorResolver(dto),
    defaultValues,
  });

  return (
    <FormContext.Provider
      value={{
        i18nPrefix,
        dto,
      }}
    >
      <RHFFormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className={className}>
          {children}
        </form>
      </RHFFormProvider>
    </FormContext.Provider>
  );
}
