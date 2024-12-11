import { Canvas, TemplateProvider, useTemplate } from './template/konva';
import { LayerPanel } from './template/konva/components/layer-panel.tsx';

import { HiddenObjectInput } from '#components';

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
          layers: layers.getAll(),
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
