import { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

import { LayerConfig } from '../types';

import { CanvasConfig } from './canvas-config';
import { TemplateContext } from './template.context';

import { useItems, useValue } from '#core/react';

export function TemplateProvider({ children }: { children: ReactNode }) {
  const { watch } = useFormContext();
  const layers = useItems(LayerConfig);
  const selectedLayerId = useValue<LayerConfig['id'] | null>(null);

  const canvasConfig = new CanvasConfig({
    height: watch('longSize') as number,
    width: watch('shortSize') as number,
  });

  return (
    <TemplateContext value={{ canvasConfig, layers, selectedLayerId }}>
      {children}
    </TemplateContext>
  );
}
