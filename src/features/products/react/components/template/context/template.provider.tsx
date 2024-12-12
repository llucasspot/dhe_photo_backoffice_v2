import { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

import { LayerConfig } from '../types';

import { TemplateContext } from './template.context';

import { useObjectArray, useValue } from '#core/react';

export function TemplateProvider({ children }: { children: ReactNode }) {
  const { watch } = useFormContext();
  const layers = useObjectArray<LayerConfig>();
  const selectedLayer = useValue<LayerConfig | null>(null);

  const canvasConfig = {
    height: watch('longSize') as number,
    width: watch('shortSize') as number,
  } as const;

  const canvasConfigFront = {
    height: canvasConfig.height * 2,
    width: canvasConfig.width * 2,
  } as const;

  return (
    <TemplateContext.Provider
      value={{ canvasConfig, layers, selectedLayer, canvasConfigFront }}
    >
      {children}
    </TemplateContext.Provider>
  );
}
