import { ReactNode } from 'react';
import { useForm } from '@mygoodstack/form-react';

import { LayerConfig } from '../types';

import { CanvasConfig } from './canvas-config';
import { TemplateContext } from './template.context';

import { useItems, useValue } from '#core/react';

export function TemplateProvider({ children }: { children: ReactNode }) {
  const {
    form: { watch },
  } = useForm();
  const layers = useItems(LayerConfig);
  const selectedLayerId = useValue<LayerConfig['id'] | null>(null);

  const canvasConfig = new CanvasConfig({
    height: watch('template.canvas.height') as number,
    width: watch('template.canvas.width') as number,
  });

  console.log('canvasConfig : ', canvasConfig);

  return (
    <TemplateContext value={{ canvasConfig, layers, selectedLayerId }}>
      {children}
    </TemplateContext>
  );
}
