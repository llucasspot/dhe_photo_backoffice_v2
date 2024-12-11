import { useState } from 'react';

import { CanvasConfig, LayerConfig } from '../types';

import { Canvas, PreviewModal } from './components';

import { useObjectArray } from '#core/react';

type TemplateProps = {
  canvas: CanvasConfig;
  layers: ReturnType<typeof useObjectArray<LayerConfig>>;
};

export function DndKitTemplate({ canvas, layers: layersArray }: TemplateProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const layers = layersArray.getAll();

  // Example preview image URL - replace with your actual image
  const previewImage =
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1440&q=80';

  const handleLayerUpdate = (updatedLayer: LayerConfig) => {
    layersArray.update(updatedLayer.id, updatedLayer);
  };

  const handleLayerRemove = (layerId: string) => {
    layersArray.remove(layerId);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <button
          type="button"
          onClick={() => setIsPreviewOpen(true)}
          className="ml-4 px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Preview Template
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-9 overflow-auto">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center justify-center min-h-[600px]">
                <Canvas
                  canvas={canvas}
                  layers={layers}
                  onLayerUpdate={handleLayerUpdate}
                  onLayerRemove={handleLayerRemove}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        canvas={canvas}
        layers={layers}
        previewImage={previewImage}
      />
    </div>
  );
}
