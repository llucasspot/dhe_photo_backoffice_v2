import { TemplateProvider, useTemplate } from './template/context';
import { Canvas } from './template/konva';
import { LayerPanel } from './template/konva/components/layer-panel';

import { HiddenObjectInput } from '#components';
import { StateItemsController } from '#core/react';

function TemplateContent() {
  const { canvasConfig, layers } = useTemplate();

  return (
    <div className="relative flex justify-center min-h-[600px]">
      <Canvas />
      <LayerPanel />
      <HiddenObjectInput
        formKey={'template'}
        value={{
          canvas: canvasConfig,
          layers: StateItemsController.getAll(layers),
        }}
      />
    </div>
  );
}

export function TemplateInput() {
  return (
    <TemplateProvider>
      <TemplateContent />
    </TemplateProvider>
  );
}
