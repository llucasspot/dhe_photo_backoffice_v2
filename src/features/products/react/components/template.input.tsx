import { useFormContext } from 'react-hook-form';

import { CanvasControls } from './template/dnd/components';
import { DndKitTemplate } from './template/dnd/dnd-kit-template.tsx';
import { LayerConfig, NewLayerDimensions } from './template/types';

import { HiddenObjectInput } from '#components';
import { useObjectArray } from '#core/react';

export function TemplateInput() {
  const { watch } = useFormContext();

  const layers = useObjectArray<LayerConfig>();

  const handleAddLayer = (dimensions: NewLayerDimensions) => {
    console.log('handleAddLayer : ', dimensions);
    layers.add({
      width: dimensions.width,
      height: dimensions.height,
      x: 0,
      y: 0,
    });
  };

  const canvasConfig = {
    height: watch('longSize'),
    width: watch('shortSize'),
  };

  return (
    <>
      <CanvasControls onAddLayer={handleAddLayer} />
      <DndKitTemplate canvas={canvasConfig} layers={layers} />
      <HiddenObjectInput
        formKey={'template'}
        value={{
          canvas: canvasConfig,
          layers: layers.getAll(),
        }}
      />
    </>
  );
}
