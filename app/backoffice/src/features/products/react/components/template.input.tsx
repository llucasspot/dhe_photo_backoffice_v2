import { TemplateProvider, useTemplate } from './template/context';
import { Canvas } from './template/konva';
import { LayerPanel } from './template/konva/components/layer-panel';

import { HiddenObjectInput } from '#components';
import { StateItemsController } from '#core/react';
import { TemplateBody } from '#features/products/domain';

function TemplateContent() {
  const { canvasConfig, layers } = useTemplate();

  const templateBody = TemplateBody.build({
    canvas: {
      height: canvasConfig.getHeight(),
      width: canvasConfig.getWidth(),
    },
    layers: StateItemsController.getAll(layers).map((layer) => {
      return {
        x: layer.getX(),
        y: layer.getY(),
        height: layer.getHeight(),
        width: layer.getWidth(),
      };
    }),
  });

  console.log('templateBody : ', templateBody);

  return (
    <div className="relative flex justify-center min-h-[600px]">
      <Canvas />
      <LayerPanel />
      <HiddenObjectInput formKey={'template'} value={templateBody} />
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
