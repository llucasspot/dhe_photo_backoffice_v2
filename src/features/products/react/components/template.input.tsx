import { DndKitTemplate } from './template/dnd/dnd-kit-template';
import { CanvasConfig, LayerConfig } from './template/types';

import { HiddenObjectInput } from '#components';
import { useObjectArray, useValue } from '#core/react';

const FRONT_COEFF = 2;

export function TemplateInput() {
  const canvas = useValue<CanvasConfig>({
    width: 180 * FRONT_COEFF,
    height: 240 * FRONT_COEFF,
  });

  const layers = useObjectArray<LayerConfig>();

  return (
    <>
      <DndKitTemplate canvas={canvas} layers={layers} />
      <HiddenObjectInput
        formKey={'template'}
        value={{
          canvas: canvas.get(),
          layers: layers.getAll(),
        }}
      />
    </>
  );
}
