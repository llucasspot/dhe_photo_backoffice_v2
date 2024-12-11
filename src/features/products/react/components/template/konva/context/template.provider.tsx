import { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

import { LayerConfig } from '../../types';

import { TemplateContext } from './template.context.ts';

import { useObjectArray, useValue } from '#core/react';

export function TemplateProvider({ children }: { children: ReactNode }) {
  const { watch } = useFormContext();
  const layers = useObjectArray<LayerConfig>();
  const selectedLayer = useValue<LayerConfig | null>(null);

  const canvasConfig = {
    height: watch('longSize'),
    width: watch('shortSize'),
  };

  return (
    <TemplateContext.Provider value={{ canvasConfig, layers, selectedLayer }}>
      {children}
    </TemplateContext.Provider>
  );
}
